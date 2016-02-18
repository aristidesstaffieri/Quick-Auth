import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { SIGNUP_FORM_FIELDS } from '../actions/actions.js'

class Form extends Component {
  render() {
		console.log(this.props)
    const {
      fields: { username, password },
      handleSubmit,
      resetForm
    } = this.props
    return (
      <div className="signup-container">
        <form onSubmit={ handleSubmit }>
          <div className="signup-username">
            <input placeholder="Username" { ...username }/>
          </div>
          <div className="signup-password">
            <input placeholder="Password" { ...password }/>
          </div>
          <div className="signup-buttons">
          <button onClick={ handleSubmit }>
						{ this.props.formType === 'SIGN_UP' ? 'Sign Up' : 'Login' }
          </button>
          </div>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
	formType: PropTypes.string.isRequired
}

export default reduxForm({
  form: 'form',
  SIGNUP_FORM_FIELDS
})(Form)
