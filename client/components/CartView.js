import ls from 'local-storage'
import React from 'react'
import {getCartThunk, deleteOrderThunk} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CartView extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getCartThunk()
  }
  render() {
    function total(arr) {
      let sumTotal = 0
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i]
        let sum = obj.price * obj.quantity
        sumTotal += sum
      }
      return sumTotal
    }
    //const items = window.ls.geti

    return (
      <div>
        <h3>Your Shopping Cart</h3>
        <div>
          {this.props.order.map((cupcakeObj, i) => (
            <div key={i}>
              <img src={cupcakeObj.imageUrl} />
              <p> {cupcakeObj.name} </p>
              <p> {cupcakeObj.price} $</p>
              <p>
                {' '}
                {cupcakeObj.quantity} cupcakes,{' '}
                {cupcakeObj.price * cupcakeObj.quantity} ${' '}
              </p>
              <button
                type="submit"
                onClick={() => this.props.deleteOrderThunk(cupcakeObj.id)}
              >
                Remove order
              </button>
            </div>
          ))}
          <p>Your Total: {total(this.props.order)} $</p>
          {this.props.order.length > 0 && (
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    order: state.cart.myOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartThunk: () => dispatch(getCartThunk()),
    deleteOrderThunk: id => dispatch(deleteOrderThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView)
