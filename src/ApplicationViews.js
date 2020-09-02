import React from 'react'
import { Route, withRouter } from 'react-router-dom';
import Login from './components/auth/Login'; 
import ProductList from './components/products/ProductList';
import ProductDetails from './components/products/ProductDetails';
import OrderList from './components/orders/OrderList';
import Account from './components/account/Account';
import ProductForm from './components/products/ProductForm';
import Register from './components/auth/Register';
import Home from './components/Home/Home';
import ProductTypes from './components/products/ProductTypes';

const ApplicationViews = props => {
    return (
        <React.Fragment>

            <Route
                path="/" render={props => {
                    return <Home {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
               exact path="/products" render={ props => {
                    return <ProductList { ...props } />
                }}
            />

            <Route
               exact path="/products/:productId" render={props => {
                    return <ProductDetails {...props} />
                }}
            />

            <Route
                path="/productTypes" render={props => {
                    return <ProductTypes {...props} />
                }}
            />

            <Route
                path="/sell" render={props => {
                    return <ProductForm {...props} />
                }}
            />

            <Route
                path="/account" render={props => {
                    return <Account {...props} />
                }}
            />

            <Route
                path="/cart" render={props => {
                    return <OrderList {...props} />
                }}
            />

        </React.Fragment>
    )
}

export default ApplicationViews;
