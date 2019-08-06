import React from 'react'
import {getCartThunk, deleteOrderThunk, completeOrderThunk} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CheckOut extends React.Component {
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
      <div id="white-checkout">
        <h2 id="gray1">Order Summary</h2>
        {this.props.order.map(cupcakeObj => (
          <div id="cart-summary" key={cupcakeObj.id}>
            <p>
              {cupcakeObj.quantity} x {cupcakeObj.name}{' '}
            </p>
            <p>${cupcakeObj.price * cupcakeObj.quantity}</p>
          </div>
        ))}
        <h4 id="total-margin">Your Total: ${total(this.props.order)}</h4>
        <hr />
        <h3 id="gray2">Payment Information</h3>
        <form>
          <div className="form-group owner">
            <label htmlFor="owner">Owner</label>
            <input type="text" className="form-control" id="owner" />
          </div>
          <div className="form-group CVV">
            <label htmlFor="cvv">CVV</label>
            <input type="text" className="form-control" id="cvv" />
          </div>
          <br />
          <div className="form-group" id="card-number-field">
            <label htmlFor="cardNumber">Card Number</label>
            <input type="text" className="form-control" id="cardNumber" />
          </div>
          <div className="form-group" id="expiration-date">
            <label>Expiration Date</label>
            <select>
              <option value="01">January</option>
              <option value="02">February </option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select>
              <option value="16"> 2016</option>
              <option value="17"> 2017</option>
              <option value="18"> 2018</option>
              <option value="19"> 2019</option>
              <option value="20"> 2020</option>
              <option value="21"> 2021</option>
            </select>
          </div>
          <div className="form-group" id="credit_cards">
            <img src="/images/visa.jpg" id="visa" />
            <img src="/images/mastercard.jpg" id="mastercard" />
            <img src="/images/amex.jpg" id="amex" />
          </div>
        </form>
        <Link to="/thankYou">
          <button
            type="submit"
            id="bottom-margin"
            className="confirmButton"
            onClick={() => this.props.completeOrderThunk()}
          >
            Confirm Order
          </button>
        </Link>
      </div>
    )
  }
}

// return (
//   <div>
//     <div className="itemSummary">
//       <h2>Item Summary</h2>
//       <table className="table">
//         <tr>
//           <div className="tableRow">
//             <th>Cupcake Name</th>
//             <th>Price</th>
//             <th>Quantity</th>
//           </div>
//         </tr>
//         <tr>
//           {this.props.order.map(cupcakeObj => (
//             <div key={cupcakeObj.id} className="tableRow">
//               <td>{cupcakeObj.name} </td>
//               <td>${cupcakeObj.price}</td>
//               <td>{cupcakeObj.quantity} </td>
//             </div>
//           ))}
//         </tr>
//       </table>
//       <p>Your Total: ${total(this.props.order)} </p>
//       <div className="heading">
//         <h1>Payment Information</h1>
//       </div>
//       <div className="payment">
//         <form>
//           <div className="form-group owner">
//             <label htmlFor="owner">Owner</label>
//             <input type="text" className="form-control" id="owner" />
//           </div>
//           <div className="form-group CVV">
//             <label htmlFor="cvv">CVV</label>
//             <input type="text" className="form-control" id="cvv" />
//           </div>
//           <br />
//           <div className="form-group" id="card-number-field">
//             <label htmlFor="cardNumber">Card Number</label>
//             <input type="text" className="form-control" id="cardNumber" />
//           </div>
//           <div className="form-group" id="expiration-date">
//             <label>Expiration Date</label>
//             <select>
//               <option value="01">January</option>
//               <option value="02">February </option>
//               <option value="03">March</option>
//               <option value="04">April</option>
//               <option value="05">May</option>
//               <option value="06">June</option>
//               <option value="07">July</option>
//               <option value="08">August</option>
//               <option value="09">September</option>
//               <option value="10">October</option>
//               <option value="11">November</option>
//               <option value="12">December</option>
//             </select>
//             <select>
//               <option value="16"> 2016</option>
//               <option value="17"> 2017</option>
//               <option value="18"> 2018</option>
//               <option value="19"> 2019</option>
//               <option value="20"> 2020</option>
//               <option value="21"> 2021</option>
//             </select>
//           </div>
//           <div className="form-group" id="credit_cards">
//             <img src="/images/visa.jpg" id="visa" />
//             <img src="/images/mastercard.jpg" id="mastercard" />
//             <img src="/images/amex.jpg" id="amex" />
//           </div>
//         </form>
//       </div>
//     </div>
// <Link to="/thankYou">
//   <button
//     type="submit"
//     id="bottom-margin"
//     className="confirmButton"
//     onClick={() => this.props.completeOrderThunk()}
//   >
//     Confirm Order
//   </button>
// </Link>
//   </div>
// )

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
    completeOrderThunk: () => dispatch(completeOrderThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
