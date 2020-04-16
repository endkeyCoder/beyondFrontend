import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './config/routes';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './config/redux/store';

function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();