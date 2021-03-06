import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

//páginas
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import RegisterUser from '../pages/RegisterUser';
import Schedulings from '../pages/Schedulings';
import UserGroups from '../pages/UserGroups';
import Schedule from '../pages/Schedule';
import GeneralSettings from '../pages/GeneralSettings';
import Audit from '../pages/Audit';
import ImpExp from '../pages/ImpExp';

//componentes globais
import MenuBar from '../components/MenuBar';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const authuser = useSelector(state => state.userReducer.user.data)

    return (
        <Route {...rest}
            render={props => {
                if (authuser.token) {
                    return (
                        <Component {...props} />
                    );
                } else {
                    return (
                        <Redirect to={{ pathname: 'signin', state: { from: props.location } }} />
                    )
                }
            }}
        />
    )
}

const Routes = () => {
    //<Route path="/ImpExp" component={ImpExp} /> rota de importação exportação de excel
    return (
        < BrowserRouter >
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/signin" component={Signin} />
                <PrivateRoute path="/users" component={RegisterUser} />
                <PrivateRoute path="/schedulings" component={Schedulings} />
                <PrivateRoute path="/usergroups" component={UserGroups} />
                <PrivateRoute path="/schedule" component={Schedule} />
                <PrivateRoute path="/generalSettings" component={GeneralSettings} />
                <PrivateRoute path="/audit" component={Audit} />
                <Route path="*" component={() => (<><MenuBar /><h1>404 ERROR NOT FOUND <br /> Página não encontrada</h1></>)} />
            </Switch>
        </BrowserRouter >
    )
}

export default Routes;