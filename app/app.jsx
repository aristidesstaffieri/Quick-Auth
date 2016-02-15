import './index.html'
import 'babel-polyfill'
import 'normalize.css/normalize.css'
import './scss/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<h1>Hello World</h1>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'))
