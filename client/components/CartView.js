import ls from 'local-storage'
import React from 'react'
import {getCartThunk, deleteOrderThunk} from '../store/cart'
import {connect} from 'react-redux'

class CartView extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getCartThunk()
  }
  render() {
    //const cupcakes = this.props.cupcakes
    //const items = window.ls.geti
    // const total = () => {
    //   let sumTotal = 0
    //   for (let i = 0; i < this.state.items.length; i++) {
    //     let obj = this.state.items[i]
    //     let multi = obj.price * obj.quantity
    //     sumTotal += multi
    //   }
    //   return sumTotal
    // }

    return (
      <div>
        <h3>Your Shopping Cart</h3>
        <div>
          {this.props.order.map((cupcakeObj, i) => (
            <div key={i}>
              <img src={cupcakeObj.imageUrl} />
              <p> {cupcakeObj.name} </p>
              <p> {cupcakeObj.price} $</p>
              <p> {cupcakeObj.quantity} cupcakes </p>
              <button
                type="submit"
                onClick={() => this.props.deleteOrderThunk(cupcakeObj.id)}
              >
                Remove order
              </button>
              {/* {we will have to look into updating the quantity and remove} */}
            </div>
          ))}
          <p>Your Total: {}</p>
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
    deleteOrderThunk: id => dispatch(deleteOrderThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView)
