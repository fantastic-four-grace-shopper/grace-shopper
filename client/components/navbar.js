import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
const Navbar = ({handleClick, isLoggedIn}, props) => {
  return (
    <div id="white">
      <h1 className="cursive" id="main-header">
        Best Cupcakes
      </h1>
      <h2 className="cursive" id="sub-heading">
        by Fantastic Four
      </h2>
      <div id="links" />
      <nav id="links">
        <Link to="/" className="navMarg">
          Cupcakes
        </Link>
        {/* <div> */}
        <Link to="/cart" className="navMarg" id="cartLink">
          Cart
          <img
            id="cart"
            src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/shopping-circle-blue-512.png"
          />
        </Link>
        {/* </div> */}
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/profile" className="navMarg">
              Profile
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="navMarg">
              Login
            </Link>
            <Link to="/signup" className="navMarg">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
      {/* <hr /> */}
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}
const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}
export default connect(mapState, mapDispatch)(Navbar)
/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
