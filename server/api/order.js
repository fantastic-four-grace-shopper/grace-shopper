const router = require('express').Router()
const Order = require('../db/models/order')
module.exports = router

//All of the below routes are already mounted on /api/order

//GET request to retrieve all of a user's completed orders
router.get('/', async (req, res, next) => {
  try {
    const allCompletedUserOrders = await Order.findAll({
      where: {
        userId: req.user.id,
        completed: true
      }
    })
    res.json(allCompletedUserOrders)
  } catch (err) {
    next(err)
  }
})

//GET request to retrieve all of a user's not completed orders
router.get('/notComplete', async (req, res, next) => {
  try {
    const allNotCompletedUserOrders = await Order.findAll({
      where: {
        userId: req.user.id,
        completed: false
      }
    })
    res.json(allNotCompletedUserOrders)
  } catch (err) {
    next(err)
  }
})

//GET request to retrieve a user's specific order
router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.orderId
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

//POST request to create a user's new order
router.post('/', async (req, res, next) => {
  try {
    const createdOrder = await Order.create(req.body)
    res.json(createdOrder)
  } catch (err) {
    next(err)
  }
})

//PUT request to update a user's not complete order status to "completed"
router.put('/:orderId', async (req, res, next) => {
  try {
    const orderToUpdate = await Order.findOne({
      where: {
        id: req.params.orderId,
        completed: false
      }
    })
    orderToUpdate.update({
      completed: true
    })
  } catch (err) {
    next(err)
  }
})

//DELETE request to delete a user's order
router.delete('/:orderId', async (req, res, next) => {
  try {
    const orderToDelete = await Order.destroy({
      where: {
        id: req.params.orderId
      }
    })
    res.json(orderToDelete)
  } catch (err) {
    next(err)
  }
})
