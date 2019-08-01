import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const POST_ORDER = 'POST_ORDER'
/**
 * INITIAL STATE
 */
const initialCartstate = {
  newOrder: {quantity: null, id: null}
}

/**
 * ACTION CREATORS
 */
const postedOrder = order => ({
  type: POST_ORDER,
  order
})

/**
 * THUNK CREATORS
 */

export const postCartThunk = order => async dispatch => {
  try {
    const res = await axios.post('/api/cart', order)
    const newOrder = res.data
    dispatch(postedOrder(newOrder))
  } catch (err) {
    console.log('posting does not work', err)
  }
}

/**
 * REDUCER
 */
export default function cartReducer(state = initialCartstate, action) {
  switch (action.type) {
    case POST_ORDER:
      return {...state, newOrder: action.order}
    default:
      return state
  }
}
