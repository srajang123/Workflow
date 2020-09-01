import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                var auth = Cookies.getJSON("activeUser");
                if (auth === undefined) return <Redirect to="/" />;
                else if (auth.login) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/" />;
                }
            }}
        />
    );
}

