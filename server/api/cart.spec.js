/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const OrderCupcake = db.model('orderCupcake')
const User = db.model('user')
const Cupcake = db.model('cupcake')
const agent = require('supertest')(app)

describe('Cart route For Guest User', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/', () => {
    beforeEach(async () => {
      await User.create({
        email: 'cody@puppybook.com'
      })
      await Cupcake.create({
        name: 'Cupcake',
        price: 7
      })
      await Order.create({
        userId: 1
      })
      await OrderCupcake.create({
        quantity: 1,
        cupcakeId: 1,
        orderId: 1
      })
    })

    it('GET /api/cart', async () => {
      const res = await agent.get('/api/cart/').expect(200)
      console.log(res.body)
      expect(res.body).to.be.an('array')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
