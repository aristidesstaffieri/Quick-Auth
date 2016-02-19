import './index.html'
import 'babel-polyfill'
import 'normalize.css/normalize.css'
import './scss/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import Home from './containers/Home'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import reducer from './reducers/reducers'
import DevTools from './containers/DevTools'

import PouchDB from 'pouchdb'
PouchDB.plugin(require('pouchdb-authentication'))
export const db = new PouchDB('http://localhost:5984/test_db', {skipSetup: true})
const reduxRouterMiddleware = syncHistory(browserHistory)

const finalCreateStore = compose(
  applyMiddleware(thunk),
	applyMiddleware(reduxRouterMiddleware),
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)

let store = finalCreateStore(reducer)
reduxRouterMiddleware.listenForReplays(store)

class App extends React.Component {
  render() {
    return (
      <div className="base-container">
        {this.props.children}
      </div>
    )
  }
}

let routes = {
  path: '/',
  component: App,
  indexRoute: { component: SignUp },
  childRoutes: [
    { path: 'home', component: Home, onEnter: requireAuth },
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp }
  ]
}

function requireAuth(nextState, replace, asyncTransition) {
  return db.getSession(function (err, response) {
    if (err) {
      console.debug(err)
      replace('/login')
    } else if (!response.userCtx.name) {
      console.debug('No one logged in', response)
			replace('/login')
    } else {
      console.debug(response.userCtx.name, 'is logged in.')
    }
    asyncTransition()
  })
}

ReactDOM.render((
  <Provider store={store}>
    <div className="app-wrapper">
      <Router routes={routes} history={browserHistory} />
      <DevTools />
    </div>
  </Provider>
), document.getElementById('app'))
