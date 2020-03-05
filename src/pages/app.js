import React from 'react';
import Routes from '../config/routes';
import { Provider } from 'react-redux';

import store from './../config/store';

// import { Container } from './styles';

export default function pages() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}
