const router = require('express').Router()
const {Cupcake} = require('../db/index')
module.exports = router

router.get('/', async (req, res, next) => {
  const cupcakes = await Cupcake.findAll()
  res.send(cupcakes)
})
