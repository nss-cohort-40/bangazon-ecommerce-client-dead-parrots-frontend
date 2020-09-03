import React, { useState, useEffect } from 'react'

export default function ProductDetails(props) {

    const [product, setProduct] = useState({})

    const getProduct = () => {
        fetch(`http://localhost:8000/products/${props.productId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(response => response.json())
        .then(setProduct)
    }
    
    useEffect(getProduct, [])

    const addingToOrder = () => {
        return fetch(`http://localhost:8000/orderproducts`, {
            'method': 'POST',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem("bangazon_token")}`
            },
            'body': JSON.stringify({
                product_id: product.id
            })
        }).then(getProduct)
    }

    return (
        <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            {product.quantity < 0 ? (
                <p>Out Of Stock</p>
            )
            : <button onClick={addingToOrder}>Add To Order</button>
            }
        </div>
    )
}
