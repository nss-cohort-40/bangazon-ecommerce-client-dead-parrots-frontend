import React from 'react'
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

export default function NavBar(props) {
    const { isAuthenticated, logout } = useSimpleAuth()

    return (
        <nav className="navbar navbar-light red flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Banagazon</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/products">Products</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/productcatergories">Product Categories</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/account">Account</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/sell">Sell</Link>
                </li>
                {
                    isAuthenticated() ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                logout()
                                props.history.push({
                                    pathname: "/"
                                })
                            }
                            }
                        >Logout</button>
                    </li> :
                    <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    </>
                }
            </ul>
        </nav>
    )
}

