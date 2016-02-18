import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { checkAuthState, logOutUser } from '../actions/actions.js'

class Home extends Component {

  constructor(props) {
    super(props)
  }

  logOutHandler() {
    this.props.dispatch(logOutUser())
  }

  render() {
    const { dispatch, user } = this.props
    return (
      <div>
        { user.name }
      	<button onClick={this.logOutHandler.bind(this)}>Log Out</button>
      </div>
    )
  }
}

Home.propTypes = {
  user: PropTypes.string.isRequired
}

const user = state => state.user

export const userAuth = createSelector(
  user,
  (user) => {
    return {
      user
    }
  }
)

export default connect(userAuth)(Home)
