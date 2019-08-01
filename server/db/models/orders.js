const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
  totalPrice: Sequelize.INTEGER
})

module.exports = Order
