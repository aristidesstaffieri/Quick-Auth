import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-authentication'))
import { db } from '../app'
import { routeActions } from 'react-router-redux'

// action types
export const SIGNUP_FORM_FIELDS = ['username', 'password']
export const RESET_FORM = 'RESET_FORM'
export const ERROR = 'ERROR'

// other constants
export const AUTHENTICATION_STATE = {
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTHENTICATED: 'UNAUTHENTICATED'
}

const { AUTHENTICATED, UNAUTHENTICATED } = AUTHENTICATION_STATE

// action creators

export function resetForm(fields) {
  return { type: RESET_FORM, fields }
}

export function handleError(err) {
  return { type: ERROR, err }
}

export function logOutUserAction(user) {
  return { type: UNAUTHENTICATED, user }
}

export function logInUserAction(name) {
  return { type: AUTHENTICATED, name: name }
}



export function logInUser(user) {
  return dispatch => {
    return db.login(user.username, user.password, function (err, response) {
      if (err) {
        dispatch(handleError(err))
      } else {
				dispatch(logInUserAction(response.name))
        dispatch(routeActions.push('/home'))
      }
    })
  }
}

export function logOutUser() {
  return dispatch => {
    return db.logout(function (err, response) {
      if (err) {
        dispatch(handleError(err))
      } else {
        dispatch(logOutRedirect(response))
      }
    })
  }
}

export function logOutRedirect(response) {
  return dispatch => {
    return dispatch(routeActions.push('/login'))
  }
}

export function checkAuthState() {
  return dispatch => {
    return db.getSession(function (err, response) {
      if (err) {
        console.debug(err)
        dispatch(logOutUser(err))
      } else if (!response.userCtx.name) {
        console.log('No one logged in')
        dispatch(logOutUser(err))
      } else {
        console.log(response.userCtx.name, 'is logged in.')
        dispatch(logInUser(response))
      }
    })
  }
}

export function createNewUser(fields) {
  return dispatch => {
    return db.signup(fields.username, fields.password, function (err, response) {
      if (err) {
        dispatch(handleError(err))
        dispatch(logOutUser(err))
      } else {
        dispatch(logInUser(fields))
      }
    })
  }
}
