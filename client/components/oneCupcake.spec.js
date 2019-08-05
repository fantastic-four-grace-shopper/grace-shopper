//import {expect} from 'chai'
const chai = require('chai')
const expect = chai.expect
// const chaiThings = require('chai-things')
// chai.use(chaiThings)
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
enzyme.configure({
  adapter: new Adapter()
})
import SingleCupcake from './oneCupcake'

// Redux
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const state = {
  cupcake: {
    id: 1,
    name: 'Rose Champagne',
    description: 'French Vanilla',
    price: 1
  }
}
const store = mockStore(state)
import reducer from '../store/cupcake'

const adapter = new Adapter()
enzyme.configure({adapter})

let cupcake = {
  id: 1,
  name: 'Rose Champagne',
  description: 'French Vanilla',
  price: 1
}
//let single = state.cupcake.single

describe('<SingleCupcake /> component', () => {
  const renderedSingleCupcake = shallow(
    <SingleCupcake single={state.cupcake} store={store} />
  )
  console.log('THIS IS OUR COMOOENTEN', renderedSingleCupcake)
  xit('renders the name of the cupcake which should be inside of a h1', () => {
    expect(renderedSingleCupcake.find('h1')).to.equal('Rose Champagne')
  })

  // it('renders list items for the campuses passed in as props', async () => {
  //   const campusRecords = await Campus.bulkCreate(campuses)
  //   //we are creating the campuses in the database so the extra credit in tier-4 doesn't break this spec.
  //   const wrapper = shallow(<CampusList campuses={campusRecords} />);
  //   const listItems = wrapper.find('li');
  //   expect(listItems).to.have.length(3);
  //   expect(listItems.at(2).text()).to.contain('Pluto');
  // });
})
