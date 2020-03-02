import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Products from '../pages/Products';
import Clients from '../pages/Clients';
import MenuBar from '../components/MenuBar';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/clients" component={Clients} />
            <Route path="*" component={() => (<><MenuBar /><h1>404 ERROR NOT FOUND</h1></>)} />
        </Switch>
    </BrowserRouter>
)

export default Routes;