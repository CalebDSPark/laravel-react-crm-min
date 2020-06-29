/* eslint-disable react/no-array-index-key */
import React from 'react';
import {    
  Redirect,
  Route
} from 'react-router-dom';
import authService from '../services/authService'
import DashboardLayout from '../views/layouts/DashboardLayout';

function PrivateRoute ({component: Component, ...rest}) {    
    // const isAuth = authService.isAuthenticated();   
    const isAuth = true; // [for Demo]
    if(isAuth) 
        console.log('[PrivateRoute] Authenticated !!');
    else 
        console.log('[PrivateRoute] Not authenticated !!');
    
    return (    
        <Route {...rest} render={props => (          
            isAuth ? 
            <DashboardLayout> <Component {...props} /> </DashboardLayout> :             
            <Redirect to="/" />      
        )} />
    )
}

export default PrivateRoute;
