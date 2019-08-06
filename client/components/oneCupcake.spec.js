//import {expect} from 'chai'
const chai = require('chai')
const expect = chai.expect
// const chaiThings = require('chai-things')
// chai.use(chaiThings)
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
    // console.log('IS THIS WORKING', renderedSingleCupcake)
    expect(renderedSingleCupcake.find('h2').text()).to.equal('Rose Champagne')
    // console.log(
    //   'IS THIS WORKING',
    //   renderedSingleCupcake
    //     .dive()
    //     .find('p')
    //     .debug()
    //     .to.have.lengthOf(2)
    // )
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
