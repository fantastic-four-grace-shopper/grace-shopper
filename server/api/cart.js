const router = require('express').Router()
const OrderCupcake = require('../db/models/orderCupcake')
const Order = require('../db/models/order')
const Cupcake = require('../db/models/cupcake')

module.exports = router

//All of the below routes are already mounted on /api/cart

//GET request to retrieve a user's cart based on their order id
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
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
  } catch (err) {
    next(err)
  }
})

// //POST request to add an item to a user's cart
// router.post('/', async (req, res, next) => {
//   try {
//     const cupcakeId = req.body.cupcakeId
//     const quantity = req.body.quantity
//     const foundOrder = await Order.findOne({
//       where: {
//         id: req.body.orderId
//       }
//     })
//     const orderId = foundOrder.id
//     if (cupcakeId) {
//       const cupcakeToUpdate = await OrderCupcake.findOne({
//         where: {
//           id: cupcakeId,
//           orderId
//         }
//       })
//       let oldQuantity = cupcakeToUpdate.quantity
//       let newQuantity = (oldQuantity += quantity)
//       cupcakeToUpdate.quantity = newQuantity
//       res.json(cupcakeToUpdate)
//     } else {
//       const newCupcake = await OrderCupcake.create({
//         orderId,
//         cupcakeId,
//         quantity
//       })
//       res.json(newCupcake)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

//DELETE request to delete an item from a user's cart
router.delete('/:cupcakeId', async (req, res, next) => {
  try {
    const cupcakeToDelete = await OrderCupcake.destroy({
      where: {
        cupcakeId: req.params.cupcakeId,
        orderId: req.body.orderId
      }
    })
    res.json(cupcakeToDelete)
  } catch (err) {
    next(err)
  }
})

//PUT request to update a user's cart's specific cupcake quantity
router.put('/:cupcakeId', async (req, res, next) => {
  try {
    //insert code ehre
  } catch (err) {
    next(err)
  }
})
