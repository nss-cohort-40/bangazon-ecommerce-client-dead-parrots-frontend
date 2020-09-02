import React from 'react'
import { Link } from "react-router-dom"
import { useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"

export default function NavBar(props) {
    const { isAuthenticated, logout } = useSimpleAuth()

    // const [searchTerm, setSearchTerm] = useState('')
    const searchTerm = useRef()

    const search = userSearch => {
        return fetch(`http://127.0.0.1:8000/products?search=${searchTerm}`, {
            method: "GET",
            headers: {
                "Content-Type": "appliation/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(userSearch)
    })
            .then(res => res.json())
            .then(() => props.history.push("/search"))
    }
    
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
                    <Link className="nav-link" to="/productTypes">Product Categories</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/account">Account</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/sell">Sell Product</Link>
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
                    <form class="navbar-form" role="search">
                    <div class="form-group navbar-right">
                        <input ref={searchTerm} type="text" className="form-control" placeholder="Search Products" ProductList/>
                    </div>
                    <button type="submit" className="btn btn-default" 
                        onClick={search}
                    >Submit</button>
                    </form>
                    </>
                }
            </ul>
        </nav>
    )
}

