import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleCupcake} from '../store/cupcake'

class SingleCupcake extends React.Component {
  componentDidMount() {
    this.props.getSingleCupcake(this.props.match.params.id)
  }
  render() {
    const cupcake = this.props.single
    return (
      <div>
        <h1>{cupcake.name}</h1>
        <img src={cupcake.imageUrl} />
        <p>{cupcake.description}</p>
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
    getSingleCupcake: id => dispatch(getSingleCupcake(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCupcake)

//
