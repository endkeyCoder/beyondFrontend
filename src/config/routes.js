import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';
import Clients from '../pages/Clients';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/clients" component={Clients} />
        </Switch>
    </BrowserRouter>
)

export default Routes;