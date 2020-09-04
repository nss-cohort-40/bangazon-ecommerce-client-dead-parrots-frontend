import React, { useEffect, useState } from 'react'
import useSimpleAuth from '../../hooks/useSimpleAuth'
import ProductCard from '../products/ProductCard'

export default function CompletedOrder(props) {

    const [order, setOrder] = useState({products: []})
    const [productOrders, setProductOrders] = useState([])
    const [total, setTotal] = useState('');

    const getProductsOrder = () => {
        fetch(`http://localhost:8000/orderproducts?order_history=${props.orderId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(res => res.json())
        .then(productOrders => {
            console.log(productOrders)
            setProductOrders(productOrders)
            
            calculateTotal(productOrders)
        })
    }

    const getProduct = () => {
        fetch(`http://localhost:8000/orders/${props.orderId}`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(response => response.json())
        .then(order => {
            setOrder(order)
        })
    }

    const calculateTotal = (productOrders) => {
        let total = 0
        productOrders.forEach(productOrder => {
            total += parseFloat(productOrder.product.price)
        });
        setTotal(total.toFixed(2))
    }

    useEffect(getProduct, [])
    useEffect(getProductsOrder, [])
    let i = 0

    return (
        <>
            <h2>Shopping Cart</h2>
            <h2>${total}</h2>
            <div>
                {productOrders.map(productorder => <div key={productorder.id}>
                <ProductCard key={productorder.product.id} 
                productId={productorder.product.url.split('products/')[1]} 
                product={productorder.product} {...props} />
                </div>)}
            </div>
        </>
    )
}