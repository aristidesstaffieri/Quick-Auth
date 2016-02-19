import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import { routeReducer } from 'react-router-redux'
import { createNewUser } from './users/reducers'
import { AUTHENTICATION_STATE, ERROR } from '../actions/actions.js'

const { UNAUTHENTICATED, AUTHENTICATED } = AUTHENTICATION_STATE

function handleAuthError(state = null, action) {
  switch (action.type) {
    case ERROR:
      return action.err
    default:
      return state
  }
}

const todoApp = combineReducers({
	user: createNewUser,
	error: handleAuthError,
	routing: routeReducer,
	form: formReducer
})


export default todoApp
