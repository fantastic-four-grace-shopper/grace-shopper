import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllCupcakes} from '../store/cupcake'

class AllCupcakes extends React.Component {
  componentDidMount() {
    this.props.getAllCupcakes()
  }
  render() {
    const cupcakes = this.props.cupcakes
    return (
      <div>
        <h3>Cupcakes</h3>
        <div>
          {cupcakes.map(cupcake => (
            <div key={cupcake.id}>
              <Link to={`/cupcakes/${cupcake.id}`}>
                <img src={cupcake.imageUrl} />
                <p> {cupcake.name} </p>
                <p> {cupcake.price} </p>
                <form>
                  <input type="number" name="quantity" min="0" max="100" />
                  <input type="submit" name="addToCart" value="Add to Cart" />
                </form>
              </Link>
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
    cupcakes: state.cupcake.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCupcakes: () => dispatch(getAllCupcakes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCupcakes)
