import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { SIGNUP_FORM_FIELDS } from '../actions/actions.js'

class Form extends Component {
  render() {
    const {
      fields: { username, password },
      handleSubmit,
      resetForm,
			formType
    } = this.props
    return (
      <div className="form-container">
        <form onSubmit={ handleSubmit }>
          <div className="form-username">
            <input placeholder="Username" { ...username }/>
          </div>
          <div className="form-password">
            <input placeholder="Password" { ...password }/>
          </div>
          <div className="form-buttons">
          <button onClick={ handleSubmit }>
						{ formType === 'SIGN_UP' ? 'Sign Up' : 'Login' }
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
