// const {expect} = require('chai')
// const app = require('../index')
// const agent = require('supertest')(app)

// describe('Cupcakes routes', () => {
//   describe('GET `/api/cupcakes`', () => {
//     it('serves up all Cupcakes', async () => {
//       const response = await agent.get('/api/cupcakes').expect(200)
//       expect(response.body).to.have.length(8)
//       expect(response.body[0].name).to.equal('Rose Champagne')
//     })
//   })

//   describe('GET `/api/cupcakes/:id`', () => {
//     it('serves up a single Cupcake by its `id`', async () => {
//       const response = await agent.get('/api/cupcakes/2').expect(200)
//       expect(response.body.name).to.equal('Fairy Godmother')
//     })
//   })
// })
