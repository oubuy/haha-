import React from 'react'
// import { HashRouter, Route, Link, BrowserRouter, MemoryRouter } from 'react-keeper'
import { Router, hashHistory } from 'react-router';


const routes = [
	{
		path: '/',
		getComponent: (nextState, cb) => {
			require.ensure([], (require) => {
				cb(null, require('views/main/main').default);
			}, 'main');
		}
    },
];

class RouterConfig extends React.Component {
	render() {
		return <Router history={hashHistory} routes={routes} />
	}
}

export default RouterConfig;