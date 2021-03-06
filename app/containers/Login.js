import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { createSelector } from 'reselect'
import {
	logInUser,
	submitForm,
	resetForm,
	SIGNUP_FORM_FIELDS, SUBMITTING
} from '../actions/actions.js'
import Form from '../components/Form'

class LoginContainer extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch, user, submitting, error } = this.props
    return (
      <div className="login-container">
        <Form
        fields={SIGNUP_FORM_FIELDS}
        resetForm={ field => dispatch(resetForm(field)) }
        onSubmit={ fields => dispatch(logInUser(fields)) }
				formType={'LOGIN'} />
				<div className="error">
					<h3>{ error ? error.message : null }</h3>
				</div>
      </div>
    )
  }
}

LoginContainer.propTypes = {
  user: PropTypes.object.isRequired
}

const user = state => state.user
const error = state => state.error

export const auth = createSelector(
  user,
  error,
  (user, error) => {
    return {
      user,
      error
    }
  }
)

export default connect(auth)(LoginContainer)
