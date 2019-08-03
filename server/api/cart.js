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
      console.log('REQ.SESSION IS: ', req.session)
    } else {
      const userId = req.user.id
      if (userId) {
        const userOrder = await Order.findOne({
          where: {
            userId,
            completed: false
          }
        })
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
  } catch (err) {
    next(err)
  }
})

//POST request to add an item to a user or guest cart
router.post('/', async (req, res, next) => {
  try {
    if (req.user === undefined) {
      if (req.session.cart === undefined) {
        req.session.cart.hello = 'enida'
        console.log(req.session.cart.hello)
        console.log('you made it')
        const cupcakeFromDb = await Cupcake.findByPk({
          where: {
            id: req.body.cupcakeId
          }
        })
        // console.log(cupcakeFromDb)
        req.session.cart.cupcakeIdOnCart = cupcakeFromDb
        req.session.cart.cupcakeIdOnCart.quantity = req.body.quantity
      } else {
        let cupcakeIdOnCart = req.body.cupcakeId
        if (req.session.cart.cupcakeIdOnCart) {
          req.session.cart.cupcakeIdOnCart.dataValues.quantity =
            req.body.quantity
        } else {
          const cupcakeFromDb = await Cupcake.findByPk(req.body.cupcakeId)
          req.session.cart.cupcakeIdOnCart = cupcakeFromDb
          req.session.cart.cupcakeIdOnCart.quantity += req.body.quantity
        }
      }
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
          cupcakeId: req.body.cupcakeId
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
    const foundOrder = await Order.findOne({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    const updatedOrder = await foundOrder.update({completed: true})
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
})

router.delete('/empty', async (req, res, next) => {
  try {
    const orderToDelete = await Order.destroy({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    res.json(orderToDelete)
  } catch (err) {
    next(err)
  }
})

router.delete('/:cupcakeId', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err)
  }
})
