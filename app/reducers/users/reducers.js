import { AUTHENTICATION_STATE, ERROR } from '../../actions/actions.js'

const { UNAUTHENTICATED, AUTHENTICATED } = AUTHENTICATION_STATE

const DEFAULT_USER_STATE = {
	name: '',
	authenticated: false
}

export function createNewUser(state = DEFAULT_USER_STATE, action) {
  switch (action.type) {
    case AUTHENTICATED:
			return Object.assign({}, state, {authenticated: true, name: action.name})
    case UNAUTHENTICATED:
      return Object.assign({}, state, {authenticated: false, name: ''})
    default:
      return state
  }
}
