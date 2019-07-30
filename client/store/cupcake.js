import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_ALL_CUPCAKES = 'GET_ALL_CUPCAKES'

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

/**
 * THUNK CREATORS
 */

export const getAllCupcakes = () => async dispatch => {
  try {
    const {data} = await axios.get('api/cupcakes')
    dispatch(gotAllCupcakes(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CUPCAKES:
      return {...state, all: action.all}
    default:
      return state
  }
}
