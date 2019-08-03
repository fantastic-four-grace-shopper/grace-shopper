import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleCupcake} from '../store/cupcake'
import ls from 'local-storage'
import Navbar from './navbar'
import {postCartThunk} from '../store/cart'

class SingleCupcake extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      cupcakeId: this.props.match.params.id
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getSingleCupcake(this.props.match.params.id)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let cupcake = this.props.single
    this.props.postThunk(this.state)
    this.setState({
      quantity: 0,
      id: cupcake.id
    })
    // let cupcakeQuantity = Number(JSON.parse(ls.get(cupcake.id)))

    // if (cupcakeQuantity) {
    //   console.log('THis is our cupcakeQUantity', cupcakeQuantity)
    //   console.log('this is our THIS STATE QUANTITY:', this.state.quantity)
    //   cupcakeQuantity += this.state.quantity
    //   ls.set(JSON.stringify(cupcake.id), JSON.stringify(cupcakeQuantity))
    // } else {
    //   ls.set(JSON.stringify(cupcake.id), JSON.stringify(this.state.quantity))
    // }
    // console.log(
    //   'this is our localStorage',
    //   Number(JSON.parse(ls.get(cupcake.id)))
    // )
    // ls.set('count', JSON.stringify(this.state.quantity))
    // let count = ls.get('count')
    // //set quantity, updated count (?), and full cupcake obj (?) onto local storage
    // this.setState({quantity: 0})
  }

  render() {
    const cupcake = this.props.single
    //ls.clear() put it in component checkout so that localstorage gets reseted
    return (
      <div>
        {/* <Navbar quantity={this.state.quantity} /> */}
        <h1>{cupcake.name}</h1>
        <img className="cupcakes" src={cupcake.imageUrl} />
        <p>{cupcake.description}</p>
        <p> {cupcake.price} $</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="quantity"
            min="0"
            max="100"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    single: state.cupcake.single
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleCupcake: id => dispatch(getSingleCupcake(id)),
    postThunk: obj => dispatch(postCartThunk(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCupcake)
