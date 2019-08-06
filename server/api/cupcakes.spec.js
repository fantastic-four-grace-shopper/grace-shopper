const {expect} = require('chai')
const app = require('../index')
const agent = require('supertest')(app)

describe('Cupcakes routes', () => {
  describe('GET `/api/cupcakes`', () => {
    it('serves up all Cupcakes', async () => {
      const response = await agent.get('/api/cupcakes').expect(200)
      let responseBody = response.body
      expect(responseBody).to.have.length(9)
      let cupcakeNames = []
      responseBody.forEach(function(resCupcake) {
        cupcakeNames.push(resCupcake.name)
      })
      let realCupcakeNames = [
        'Fairy Godmother',
        'Rose Champagne',
        'Hot Coco Loco',
        'Berry Blue',
        'Fruit Tingle',
        "I'm Too Sweet For My Love",
        'Intergalactic',
        'Nuts For Peanuts',
        'Caramel Bliss'
      ]
      let result = true
      for (let i = 0; i < cupcakeNames.length; i++) {
        if (realCupcakeNames.includes(cupcakeNames[i])) {
          continue
        } else {
          result = false
        }
      }
      expect(result).to.be.equal(true)
    })
  })

  describe('GET `/api/cupcakes/:id`', () => {
    it('serves up a single Cupcake by its `id`', async () => {
      const response = await agent.get('/api/cupcakes/2').expect(200)
      expect(response.body.name).to.equal('Fairy Godmother')
    })
  })
})
