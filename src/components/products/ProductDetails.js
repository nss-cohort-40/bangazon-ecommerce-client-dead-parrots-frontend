import React, { useState, useEffect } from 'react'

export default function ProductDetails(props) {

    const [product, setProduct] = useState({})
    const [pageReload, setPageReload] = useState(false)

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
        .then(products => {
            setProduct(products)
        })
        .then(() => setPageReload(!pageReload))
    }

    const updatingQuantity = () => {
        fetch(`http://localhost:8000/products/${props.productId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
    }

    useEffect (() => {
        getProduct()
        // updatingQuantity()
    }, [])

    const addingToOrder = () => {
        fetch(`http://localhost:8000/orders`, {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem("bangazon_token")}`
            }
        }).then(res => res.json())
        .then(order => {
            console.log(order[0].id)
            console.log(product.id)
            fetch(`http://localhost:8000/orderproducts`, {
                'method': 'POST',
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem("bangazon_token")}`
                },
                'body': JSON.stringify({
                    product_id: product.id,
                    order_id: order[0].id
                })
            })
        })
    }

    return (
        <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <button onClick={addingToOrder}>Add To Order</button>
        </div>
    )
}
