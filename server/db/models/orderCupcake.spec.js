const {expect} = require('chai')
const db = require('../index')
const OrderCupcake = db.model('orderCupcake')
const Order = db.model('order')
const Cupcake = db.model('cupcake')

describe('OrderCupcake model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correct validations', () => {
    let newOrderCupcake
    let newOrder
    let newCupcake1
    let newCupcake2

    beforeEach(async () => {
      newOrder = await Order.create({
        completed: false
      })
      newCupcake1 = await Cupcake.create({
        name: 'deliciousness',
        price: 4
      })
      newCupcake2 = await Cupcake.create({
        name: 'awesomeness',
        price: 6
      })
      newOrderCupcake = await OrderCupcake.create({
        quantity: 6,
        cupcakeId: 1,
        orderId: 1
      })
    })
    it('quantity is a number', () => {
      expect(typeof newOrderCupcake.quantity === 'number')
    })
    it('pt1: cupcakeId foreign key cooresponds to the correct cupcake', () => {
      expect(newOrderCupcake.cupcakeId === newCupcake1.id).to.be.equal(true)
    })
    it('pt2: cupcakeId foreign key cooresponds to the correct cupcake', () => {
      expect(newOrderCupcake.cupcakeId === newCupcake2.id).to.be.equal(false)
    })
    it('orderId foreign key cooresponds to the correct order', () => {
      expect(newOrderCupcake.orderId === newOrder.id).to.be.equal(true)
    })
  }) // end describe('correct validations')
}) // end describe('OrderCupcake model')
