import React from 'react'
// const chai = require('chai')
import {expect} from 'chai'
import chai from 'chai'
import reducer from './cupcake'
import {GET_ALL_CUPCAKES, gotAllCupcakes} from './cupcake'
import {bindActionCreators} from 'redux'
const cupcakes = [{name: 'Hot Coco Loco'}, {name: 'Rose Champagne'}]

describe('cupcakes action creator', () => {
  const cupcakesAction = gotAllCupcakes(cupcakes)
  it('returns a Plain Old JavaScript Object', () => {
    expect(typeof cupcakesAction).to.equal('object')
  })
  it('creates an object with type and cupcakes', () => {
    expect(gotAllCupcakes.type).to.equal(GET_ALL_CUPCAKES)
  })
})

describe('cupcakes', () => {
  const initialState = {
    cupcakes
  }

  const newState = reducer(initialState, {
    type: GET_ALL_CUPCAKES,
    cupcakes: cupcakes
  })

  it('returns a new state with all cupcakes', () => {
    expect(newState.cupcakes).to.deep.equal(cupcakes)
  })
})
