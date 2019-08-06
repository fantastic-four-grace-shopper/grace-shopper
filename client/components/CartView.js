import React from 'react'
import {getCartThunk, deleteOrderThunk, clearCartThunk} from '../store/cart'
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
    return (
      <div>
        <h2 className="headers">Your Shopping Cart</h2>
        <div>
          {this.props.order.map((cupcakeObj, i) => (
            <div id="cupcake-container" key={i}>
              <img src={cupcakeObj.imageUrl} className="cupcakes" />
              <div id="sub-container">
                <p>Cupcake: {cupcakeObj.name} </p>
                <p>Price: ${cupcakeObj.price} </p>
                <p>
                  {' '}
                  Quantity: {cupcakeObj.quantity}{' '}
                  {cupcakeObj.quantity === 1 ? 'cupcake' : 'cupcakes'} (${cupcakeObj.price *
                    cupcakeObj.quantity})
                </p>

                <button
                  type="submit"
                  onClick={() => this.props.deleteOrderThunk(cupcakeObj.id)}
                  className="remove"
                >
                  Remove order
                </button>
              </div>
            </div>
          ))}
          <h3 id="total">Your Total: ${total(this.props.order)} </h3>
          {this.props.order.length > 0 && (
            <div>
              <Link to="/checkout">
                <button type="button" className="confirmButton">
                  Checkout
                </button>
              </Link>
              <br />
              <br />
              <button
                type="button"
                onClick={() => this.props.clearCartThunk()}
                id="bottom-margin"
              >
                Clear your cart
              </button>
            </div>
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
    deleteOrderThunk: id => dispatch(deleteOrderThunk(id)),
    clearCartThunk: () => dispatch(clearCartThunk())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartView)
