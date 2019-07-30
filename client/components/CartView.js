import ls from 'local-storage'
import React from 'react'
//import {connect} from 'react-redux'
//mport {Link} from 'react-router-dom'

class CartView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        {quantity: 5, price: 3},
        {quantity: 2, price: 4},
        {quantity: 1, price: 2},
        {quantity: 3, price: 2}
      ]
    }
  }
  componentDidMount() {
    //   this.props.getAllCupcakes()
    //this.setState({items: ls.get("items")})
  }
  render() {
    //const cupcakes = this.props.cupcakes
    //const items = window.ls.geti
    const total = () => {
      let sumTotal = 0
      for (let i = 0; i < this.state.items.length; i++) {
        let obj = this.state.items[i]
        let multi = obj.price * obj.quantity
        sumTotal += multi
      }
      return sumTotal
    }

    return (
      <div>
        <h3>Your Shopping Cart</h3>
        <div>
          {this.state.items.map((objCupcake, i) => (
            <div key={i}>
              <img src={objCupcake.imageUrl} />
              <p> {objCupcake.name} </p>
              <p> {objCupcake.price} </p>
              <p> {objCupcake.quantity} </p>
              {/* {we will have to look into updating the quantity and remove} */}
            </div>
          ))}
          <p>Your Total: {total()}</p>
        </div>
      </div>
    )
  }
}

//   const mapStateToProps = state => {
//     return {
//      // ...state,
//      // cupcakes: state.cupcake.all
//     }
//   }

//   const mapDispatchToProps = dispatch => {
//     return {
//      // getAllCupcakes: () => dispatch(getAllCupcakes())
//     }
//   }

// export default connect(mapStateToProps, mapDispatchToProps)(CartView)
export default CartView
