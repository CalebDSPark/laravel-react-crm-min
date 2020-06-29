/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense  
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

import LoadingScreen from '../components/LoadingScreen';
import Login from '../views/Auth/LoginForm'
import PrivateRoute from './PrivateRoute';
import DashRoute from './DashRoute';

const Dash = lazy(() => import('../views/Dashboard'));
const NotFound = lazy(() => import('../views/Pages/Error404View'));
const MyAccount = lazy(() => import('../views/Account'));
const CustomerList = lazy(() => import('../views/Customer/List'));
const CustomerCreate = lazy(() => import('../views/Customer/Create'));
const ProductList = lazy(() => import('../views/Product/List'));
const ProductCreate = lazy(() => import('../views/Product/Create'));
const InvoiceList = lazy(() => import('../views/Invoice/List'));
const InvoiceView = lazy(() => import('../views/Invoice/View'));

function Routes () {
    return (
        <Suspense fallback={<LoadingScreen />}>
            <Switch>                              
                <DashRoute exact path='/' component={Login} />
                <DashRoute path='/login' component={Login} />
                <PrivateRoute path='/dash' component={Dash} />
                <PrivateRoute path='/myaccount' component={MyAccount} />
                <PrivateRoute exact path='/customers' component={CustomerList} />                                    
                <PrivateRoute exact path='/customers/create' component={CustomerCreate} />                                                
                <PrivateRoute exact path='/products' component={ProductList} />
                <PrivateRoute exact path='/products/create' component={ProductCreate} />                
                <PrivateRoute exact path='/invoices' component={InvoiceList} />                                
                <PrivateRoute exact path='/invoices/:invoiceId/view' component={InvoiceView} />                   
                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );    
}

export default Routes;
