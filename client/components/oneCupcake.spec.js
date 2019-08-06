const chai = require('chai')
const expect = chai.expect
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
enzyme.configure({
  adapter: new EnzymeAdapter()
})
import {SingleCupcake} from './oneCupcake'

// Redux
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const state = {
  cupcake: {
    single: {
      id: 1,
      name: 'Rose Champagne',
      description: 'French Vanilla',
      price: 1
    }
  },
  match: {
    params: {
      id: 1
    }
  },
  getSingleCupcake() {}
}

describe('<SingleCupcake /> component', () => {
  let renderedSingleCupcake
  beforeEach('create <SingleCupcake/> wrapper', () => {
    let store = mockStore(state)
    renderedSingleCupcake = shallow(
      <SingleCupcake
        match={state.match}
        params={state.match.params}
        single={state.cupcake.single}
        getSingleCupcake={state.getSingleCupcake}
        store={store}
      />
    )
  })
  it('renders the name of the cupcake which should be inside of a h2', () => {
    expect(renderedSingleCupcake.find('h2').text()).to.equal('Rose Champagne')
  })
  it('renders the description of a cupcake which should be inside of a p tag', () => {
    expect(renderedSingleCupcake.find('.italics').text()).to.equal(
      'French Vanilla'
    )
  })
  it('renders the price of a cupcake which should be inside of a p tag', () => {
    expect(renderedSingleCupcake.find('.price').text()).to.equal(' Price: $1')
  })

  it('renders a "add to cart" button', () => {
    expect(renderedSingleCupcake.find('.submit').text()).to.equal('Add to Cart')
  })
  it('renders a "back to all cupcakes" link', () => {
    expect(renderedSingleCupcake.find('#back-button').text()).to.equal(
      '<Link />'
    )
  })
})
