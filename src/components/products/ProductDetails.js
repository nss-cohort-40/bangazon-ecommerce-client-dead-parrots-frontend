import React, { useState, useEffect } from 'react'

export default function ProductDetails(props) {

    const [product, setProduct] = useState({})

    const getProduct = () => {
        fetch(`http://localhost:8000/products/${props.productId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                // "Content-Type": "application/json",
                // "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(response => response.json())
        .then(products => {
            setProduct(products)
            // setNumProducts(products.quantity)
        })
    }

    useEffect (() => {
        getProduct()
    }, [])



    return (
        <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            {/* <p>{product.quantity}</p> */}
            <p>{product.price}</p>
        </div>
    )
}
