import './index.html'
import 'babel-polyfill'
import 'normalize.css/normalize.css'
import './scss/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, BrowserHistory, hashHistory } from 'react-router'
import { persistState } from 'redux-devtools'
import Home from './containers/Home'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import reducer from './reducers/reducers'
import DevTools from './containers/DevTools'

const finalCreateStore = compose(
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)

let store = finalCreateStore(reducer)

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
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'signup', component: SignUp }
  ]
}

ReactDOM.render((
  <Provider store={store}>
    <div className="app-wrapper">
      <Router routes={routes} history={hashHistory} />
      <DevTools />
    </div>
  </Provider>
), document.getElementById('app'))
