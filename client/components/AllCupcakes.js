import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllCupcakes} from '../store/cupcake'
import Navbar from './navbar'
class AllCupcakes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.getAllCupcakes()
  }

  render() {
    const cupcakes = this.props.cupcakes
    return (
      <div>
        {/* <Navbar /> */}
        <h3>Cupcakes</h3>
        <div id="allCupcakesContainer">
          {cupcakes.map(cupcake => (
            <div key={cupcake.id} className="cupBox">
              <Link to={`/cupcakes/${cupcake.id}`}>
                <img className="cupcakes" src={cupcake.imageUrl} />
                <p> {cupcake.name} </p>
              </Link>
              <p> {cupcake.price} $</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cupcakes: state.cupcake.all
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCupcakes: () => dispatch(getAllCupcakes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCupcakes)
