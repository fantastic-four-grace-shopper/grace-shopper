/* eslint-disable complexity */
/* eslint-disable max-statements */
const router = require('express').Router()
const OrderCupcake = require('../db/models/orderCupcake')
const Order = require('../db/models/order')
const Cupcake = require('../db/models/cupcake')

module.exports = router

//All of the below routes are already mounted on /api/cart

//GET request to retrieve a user's cart based on their order id
router.get('/', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      if (req.session.cart === undefined) {
        req.session.cart = []
        res.json(req.session.cart)
      } else {
        res.json(req.session.cart)
      }
    } else {
      const userId = req.user.id
      if (userId) {
        const userOrder = await Order.findOne({
          where: {
            userId,
            completed: false
          }
        })
        if (!userOrder) {
          res.json([])
        } else {
          const orderId = userOrder.id
          const cupcakesInOrder = await OrderCupcake.findAll({
            where: {
              orderId
            }
          })
          let cupcakeArr = []
          for (let i = 0; i < cupcakesInOrder.length; i++) {
            let obj = cupcakesInOrder[i]
            let cupcakeId = obj.cupcakeId
            let quantity = obj.quantity
            let cupcake = await Cupcake.findByPk(cupcakeId)
            cupcake.dataValues.quantity = quantity
            cupcakeArr.push(cupcake)
          }
          res.json(cupcakeArr)
        }
      }
    }
  } catch (err) {
    next(err)
  }
})

//GET request to retrieve a logged in user's order history
router.get('/orders', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      res.json([])
    } else {
      const userId = req.user.id
      const userOrder = await Order.findAll({
        where: {
          userId,
          completed: true
        }
      })
      let cupcakeArr = []
      for (let i = 0; i < userOrder.length; i++) {
        const userOrderId = userOrder[i].id
        const cupcakesInOrder = await OrderCupcake.findAll({
          where: {
            orderId: userOrderId
          }
        })
        for (let j = 0; j < cupcakesInOrder.length; j++) {
          let obj = cupcakesInOrder[j]
          let cupcakeId = obj.cupcakeId
          let quantity = obj.quantity
          let cupcake = await Cupcake.findByPk(cupcakeId)
          cupcake.dataValues.quantity = quantity
          cupcakeArr.push(cupcake)
        }
      }
      res.json(cupcakeArr)
    }
  } catch (err) {
    next(err)
  }
})

//POST request to add an item to a user or guest cart
router.post('/', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      let cupcakeForCart = await Cupcake.findByPk(req.body.cupcakeId)
      cupcakeForCart.dataValues.quantity = req.body.quantity
      let newOrderCupcake = cupcakeForCart
      let newOrder = newOrderCupcake.dataValues

      if (req.session.cart.length === 0) {
        req.session.cart.push(newOrder)
        req.session.save()
      } else if (
        req.session.cart.every(function(cupcake) {
          return cupcake.id !== newOrder.id
        })
      ) {
        req.session.cart.push(newOrder)
        req.session.save()
      } else {
        // if cupcake is in cart already then update number
        for (let i = 0; i < req.session.cart.length; i++) {
          let oldOrder = req.session.cart[i]
          if (oldOrder.id === newOrder.id) {
            const newSum = Number(oldOrder.quantity) + Number(newOrder.quantity)
            oldOrder.quantity = String(newSum)
            req.session.save()
          }
        }
        req.session.save()
      }
      req.session.save()
    } else {
      const userId = req.user.id
      let foundOrder = await Order.findOne({
        where: {
          completed: false,
          userId
        }
      })
      if (!foundOrder) {
        foundOrder = await Order.create({userId})
      }
      const cupcakeToUpdate = await OrderCupcake.findOne({
        where: {
          cupcakeId: req.body.cupcakeId,
          orderId: foundOrder.id
        }
      })
      if (cupcakeToUpdate) {
        const newQuantity =
          Number(cupcakeToUpdate.quantity) + Number(req.body.quantity)
        cupcakeToUpdate.update({quantity: newQuantity})
        res.json(cupcakeToUpdate)
      } else {
        const newOrderCupcake = await OrderCupcake.create({
          quantity: req.body.quantity,
          cupcakeId: req.body.cupcakeId,
          orderId: foundOrder.id
        })
        res.json(newOrderCupcake)
      }
    }
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      req.session.cart = []
      res.json(req.session.cart)
    } else {
      const foundOrder = await Order.findOne({
        where: {
          userId: req.user.id,
          completed: false
        }
      })
      const updatedOrder = await foundOrder.update({completed: true})
      res.json(updatedOrder)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/empty', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      req.session.cart = []
      res.json(req.session.cart)
    } else {
      const orderToDelete = await Order.destroy({
        where: {
          userId: req.user.id,
          completed: false
        }
      })
      res.json(orderToDelete)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:cupcakeId', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      req.session.cart = req.session.cart.filter(function(cupcake) {
        return cupcake.id !== Number(req.params.cupcakeId)
      })
      res.json(req.session.cart)
    } else {
      const userId = req.user.id
      const foundOrder = await Order.findOne({
        where: {
          userId,
          completed: false
        }
      })
      const deleted = await OrderCupcake.destroy({
        where: {
          cupcakeId: req.params.cupcakeId,
          orderId: foundOrder.id
        }
      })
      res.json(deleted)
    }
  } catch (err) {
    next(err)
  }
})
