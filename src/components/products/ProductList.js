import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

export default function ProductList(props) {
    const [products, setProducts] = useState([])
    const [customer, setCustomer] = useState({})

    const getCustomer = () => {
        return fetch("http://localhost:8000/customers", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(response => response.json())
            .then((customer) => {
                setCustomer(customer[0])
            })
    }

    const getProducts = () => {
        return fetch(`http://localhost:8000/products?quantity=20`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(res => res.json())
            .then(setProducts)
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(getCustomer, [])

    return (
        <div>
            {products.map(product => <ProductCard key={product.id} getProducts={getProducts} customer={customer} product={product} {...props} />)}
        </div>
    )
}
