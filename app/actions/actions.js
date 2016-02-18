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

export function logOutUser(user) {
  return { type: UNAUTHENTICATED, user }
}

export function logInUser(user) {
  return { type: AUTHENTICATED, user }
}
