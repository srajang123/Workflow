import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({component : Component, ...rest}) => {
    return (
        <Route
        {...rest} 
        render={props => {
            var auth = JSON.parse(Cookies.get("activeUser"));
            if(auth===undefined) return <Redirect to="/"/>;
            else if (auth.authenticated) {
                return <Component {...props} />;
            } else {
                return <Redirect to="/"/>;
            }
        }}
        />
    );
}

