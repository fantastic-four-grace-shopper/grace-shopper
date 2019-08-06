const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('completed field', () => {
    let newOrder

    beforeEach(async () => {
      newOrder = await Order.create({})
    })

    it('returns false as default value', () => {
      expect(newOrder.completed === false)
    })
  }) // end describe('completed field')
}) // end describe('Order model')
