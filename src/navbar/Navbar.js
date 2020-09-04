import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

export default function NavBar(props) {

    const searchTerm = useRef()

    const logout = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("bangazon_token")
    }

    const [loggedIn, setIsLoggedIn] = useState(false)

    const isAuthenticated = () =>
        loggedIn || localStorage.getItem('bangazon_token') !== null

    const handleLogout = () => {
        props.setCurrentUser(false)
        logout()
        props.setCurrentUser(true)
        props.history.push('/')
    }

    return (
        <nav className="navbar navbar-light red flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills nav-fill">

                <li className="nav-item">
                    <Link className="nav-link" to="/">Bangazon</Link>
                </li>
                <form className="navbar-form d-flex" role="search">
                                <div className="form-group navbar-right">
                                    <input style={{ "margin-top" : "8px" }} ref={searchTerm} type="text" className="searchTerm" placeholder="Search Products"/>
                                </div>
                                <button type="submit" className="btn btn-default"  style={{ "margin-top" : "-14px" }}
                                    onClick={(event) => { props.search(event, searchTerm.current.value) }}
                                >Search</button>
                </form>
                {
                    isAuthenticated() ?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/sell">Sell Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/account">Account</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link fakeLink"
                                    onClick={handleLogout}
                                >Logout</button>
                            </li>
                        </>
                        : null}
                {!isAuthenticated() ?
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
                    : null}
            </ul>
        </nav >
    )
}

