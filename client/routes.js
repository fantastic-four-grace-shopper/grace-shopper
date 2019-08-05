import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllCupcakes from './components/AllCupcakes'
import SingleCupcake from './components/oneCupcake'
import CartView from './components/CartView'
import CheckOut from './components/checkout'
import ThankYou from './components/ThankYou'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* {isLoggedIn && (
          <Switch>
            <Route path="/profile" component={UserHome} />
          </Switch>
        )} */}
        {/* Displays our Login component as a fallback */}
        <Route exact path="/" component={AllCupcakes} />
        <Route exact path="/profile" component={UserHome} />
        <Route exact path="/cupcake/:id" component={SingleCupcake} />
        <Route exact path="/cart" component={CartView} />
        <Route exact path="/thankYou" component={ThankYou} />
        <Route exact path="/checkout" component={CheckOut} />

        {/* // render={routeProps => <SingleCupcake {...routeProps} />} */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
