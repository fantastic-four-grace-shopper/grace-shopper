const Sequelize = require('sequelize')
const db = require('../db')

const Cupcake = db.define('cupcake', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Cupcake
