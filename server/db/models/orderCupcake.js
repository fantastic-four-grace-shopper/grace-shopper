const Sequelize = require('sequelize')
const db = require('../db')

const OrderCupcake = db.define('orderCupcake', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderCupcake
