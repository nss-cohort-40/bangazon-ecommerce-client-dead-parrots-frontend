import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

export default function ProductList(props) {
    const [products, setProducts] = useState([])

    const getProducts = () => {
        fetch(`http://localhost:8000/products?quantity=20`, {
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

    return (
        <div>
            <Link to={`sell/`}>
                <button >
                    Sell Product
            </button>
            </Link>

            {products.map(product => <ProductCard key={product.id} product={product} {...props} />)}
        </div>
    )
}
