const router = require('express').Router()
const Cupcake = require('../db/models/cupcake')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const cupcakes = await Cupcake.findAll()
    res.json(cupcakes)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleCupcake = await Cupcake.findOne({where: {id: req.params.id}})
    res.json(singleCupcake)
  } catch (err) {
    next(err)
  }
})
