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
  }

  render() {
    const cupcake = this.props.single
    return (
      <div>
        <h1>{cupcake.name}</h1>
        <img className="cupcakes" src={cupcake.imageUrl} />
        <p>{cupcake.description}</p>
        <p> ${cupcake.price}</p>
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
        <br />
        <Link to="/">Back to all cupcakes</Link>
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
