const {expect} = require('chai')
const db = require('../index')
const Cupcake = db.model('cupcake')

describe('Cupcake model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correct validations', () => {
    let newCupcake

    beforeEach(async () => {
      newCupcake = await Cupcake.create({
        name: 'Fruity Surprise',
        price: 6
      })
    })

    it('name is a string', () => {
      expect(typeof newCupcake.name === 'string')
    })

    it('price is a number', () => {
      expect(typeof newCupcake.name === 'number')
    })

    // it('imageUrl is a valid url', () => {
    //   expect(newCupcake.imageUrl === false)
    // })
  }) // end describe('correct validations')
}) // end describe('Cupcake model')
