const router = require('express').Router()
const Cupcake = require('../db/models/cupcake')
module.exports = router

//All of the below routes are already mounted on /api/cupcakes

//GET route to get all cupcakes
router.get('/', async (req, res, next) => {
  try {
    // req.session.destroy()
    if (req.session.cart === undefined) {
      req.session.cart = []
    }
    const cupcakes = await Cupcake.findAll()
    res.json(cupcakes)
  } catch (err) {
    next(err)
  }
})

//GET route to get a single cupcake
router.get('/:id', async (req, res, next) => {
  try {
    const singleCupcake = await Cupcake.findOne({where: {id: req.params.id}})
    res.json(singleCupcake)
  } catch (err) {
    next(err)
  }
})

//POST route to add a new cupcake
router.post('/:id', async (req, res, next) => {
  try {
    const createdCupcake = await Cupcake.create(req.body)
    res.json(createdCupcake)
  } catch (err) {
    next(err)
  }
})

//DELETE route to delete a cupcake
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedCupcake = await Cupcake.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deletedCupcake)
  } catch (err) {
    next(err)
  }
})
