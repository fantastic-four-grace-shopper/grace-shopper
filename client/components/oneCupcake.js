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
      quantity: 1,
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
      quantity: 1,
      id: cupcake.id
    })
    throw alert('item added to your cart!')
  }

  render() {
    const cupcake = this.props.single
    return (
      <div>
        <h2 className="headers">{cupcake.name}</h2>
        <img className="cupcakes" src={cupcake.imageUrl} />
        <p className="italics">{cupcake.description}</p>
        <p className="price"> Price: ${cupcake.price}</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="quantity"
            min="1"
            max="100"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button type="submit" className="submit">
            Add to Cart
          </button>
        </form>
        <br />
        <div id="back-button">
          <Link to="/">Back to all cupcakes</Link>
        </div>
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
