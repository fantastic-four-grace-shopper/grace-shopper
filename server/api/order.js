const router = require('express').Router()
const Order = require('../db/models/order')
module.exports = router

// All of the below routes are already mounted on /api/order

// GET request to retrieve all of a user's completed orders -- TIER 2
// router.get('/', async (req, res, next) => {
//   try {
//     //check if req.user.id is valid
//     const allCompletedUserOrders = await Order.findAll({
//       where: {
//         userId: req.user.id,
//         completed: true
//       }
//     })
//     res.json(allCompletedUserOrders)
//   } catch (err) {
//     next(err)
//   }
// })

// GET request to retrieve a user's past specific order
// router.get('/:orderId', async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: {
//         id: req.params.orderId,
//         completed: true
//       }
//     })
//     res.json(order)
//   } catch (err) {
//     next(err)
//   }
// })
