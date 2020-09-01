import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'


export default function ApplicationViews(props) {

    const setCurrentUser = props.setCurrentUser
    return (
        <>
            <Route
                exact
                path='/register'
                render={props => {
                    return <Register setIsCurrentUser={setCurrentUser} {...props} />
                }}
            />
            <Route
                exact
                path="/login"
                render={props => {
                    return <Login setIsCurrentUser={setCurrentUser} {...props} />
                }}
            />
        </>
    )
}
