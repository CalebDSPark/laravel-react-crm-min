/* eslint-disable react/no-array-index-key */
import React from 'react';
import {    
  Redirect,
  Route
} from 'react-router-dom';
import authService from '../services/authService'

function DashRoute ({component: Component, ...rest}) {    
    const isAuth = authService.isAuthenticated();   
    if(isAuth) 
        console.log('[DashRoute] Authenticated !!');
    else 
        console.log('[DashRoute] Not authenticated !!');
    
    return (    
        <Route {...rest} render={props => (          
            isAuth ? 
            <Redirect to="/dash" /> : 
            <Component {...props} />
        )} />
    )
}

export default DashRoute;
