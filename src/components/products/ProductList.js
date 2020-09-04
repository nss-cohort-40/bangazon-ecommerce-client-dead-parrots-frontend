import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import ApiManager from '../../api/ApiManager'

export default function ProductList(props) {
    const [products, setProducts] = useState([])
    const [customer, setCustomer] = useState({})

    const getCustomer = () => {
        ApiManager.getCurrentCustomer().then(customer => {
            setCustomer(customer[0])
        }).then(() => getProducts)
    }

    const getProducts = () => {
        fetch(`http://localhost:8000/products`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(res => res.json())
        .then(products => {
            let customerProducts = products.filter(product => parseInt(product.seller.url.split('customers/')[1]) === customer.id)
            setProducts(customerProducts)
        })
    }

    useEffect(getCustomer, [])

    useEffect(getProducts, [customer])

    return (
        <div>
            {products.map(product => <ProductCard key={product.id} productId={product.id} getProducts={getProducts} customer={customer} product={product} {...props} />)}
        </div>
    )
}
