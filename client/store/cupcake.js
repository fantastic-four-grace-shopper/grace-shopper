import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_ALL_CUPCAKES = 'GET_ALL_CUPCAKES'
const GET_SINGLE_CUPCAKE = 'GET_SINGLE_CUPCAKE'
/**
 * INITIAL STATE
 */
const initialState = {
  all: [],
  single: {}
}

/**
 * ACTION CREATORS
 */

const gotAllCupcakes = all => ({type: GET_ALL_CUPCAKES, all})
const gotSingleCupcake = one => ({type: GET_SINGLE_CUPCAKE, one})
/**
 * THUNK CREATORS
 */

export const getAllCupcakes = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cupcakes')
    dispatch(gotAllCupcakes(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleCupcake = cupcakeId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cupcakes/${cupcakeId}`)
    dispatch(gotSingleCupcake(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CUPCAKES:
      return {...state, all: action.all}
    case GET_SINGLE_CUPCAKE:
      return {...state, single: action.one}
    default:
      return state
  }
}
