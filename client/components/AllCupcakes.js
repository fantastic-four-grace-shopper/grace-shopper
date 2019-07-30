import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import getAllCupcakes thunk

class AllCupcakes extends React.Component {
  componentDidMount() {
    //this is where we are going to put our getAllCupcakes() thunk
    //ie this.props.getAllCupcakes()
  }
  render() {
    //const cupcakes = this.props.cupcakes
    // this should be an array that has all of our cupcakes from our redux state
    return (
      <div>
        <h3>Cupcakes</h3>
        <div>
          {cupcakes.map(cupcake => (
            <div key={cupcake.id}>
              {/* <Link to={`/cupcakes/${cupcake.id}`} > */}
              <img src={cupcake.imageUrl} />
              <p> {cupcake.name} </p>
              <p> {cupcake.price} </p>
              <form>
                <input type="number" name="quantity" min="0" max="100" />
                <input type="submit" name="addToCart" value="Add to Cart" />
              </form>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    cupcakes: state.cupcakes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCupcakes: () => dispatch(getAllCupcakes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCupcakes)
