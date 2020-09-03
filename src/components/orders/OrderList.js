import React, { useState, useEffect } from 'react'
import ProductCard from '../products/ProductCard'
import PaymentType from '../payment_types/PaymentType'
import ApiManager from '../../api/ApiManager';


export default function OrderList(props) {

    const [productOrders, setProductOrders] = useState([])
    const [order, setOrder] = useState({product: []})
    const [toggle, setToggle] = useState(false)
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [paymentType, setPaymentType] = useState('');


    const getProductsOrder = () => {
        fetch(`http://localhost:8000/orderproducts`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(res => res.json())
        .then(setProductOrders)
    }

    const getOrder = () => {
        fetch(`http://localhost:8000/orders`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(res => res.json())
        .then(order => setOrder(order[0]))
    }

    const getPaymentTypes = () => {
        ApiManager.getPaymentTypes()
        .then((paymentTypes) => {
          setPaymentTypes(paymentTypes)
        })
      };

    useEffect(getProductsOrder, [])
    useEffect(getOrder, [])
    useEffect(getPaymentTypes, [])

    const handleFieldChange = e => {
        setPaymentType(e.target.value)
    };

    const completeOrder = () => {
        fetch(`http://localhost:8000/orders/${order.id}`, {
            'method': 'PUT',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem("bangazon_token")}`
            },
            'body': JSON.stringify({
                payment_type_id: paymentType
            })
        }).then(props.history.push('/confirmation'))
    }

    const cancelOrder = () => {
      return fetch(`http://localhost:8000/orders/${order.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${localStorage.getItem('bangazon_token')}`
        }
      }).then(props.history.push('/'))
    }

    return (
        <>
            <h2>Shopping Cart</h2>
            <button onClick={() => setToggle(!toggle)}>Complete Order</button>
            {toggle ? (
                <div>
                    <select value={paymentTypes.Id} onChange={handleFieldChange}>
                        <option className="hide-option" value=''>Payment Type</option>
                        {paymentTypes.map(paymentType => 
                        <option key={paymentType.id} value={paymentType.id}>{paymentType.merchant_name}</option>
                        )}
                    </select>
                    <button onClick={completeOrder}>Done</button>
                </div>
            )
            :
            null}
            <div>
                {productOrders.map(productorder => <ProductCard key={productorder.id} product={productorder.product} {...props} />)}
            </div>
            <button onClick={cancelOrder}>Cancel Order</button>
        </>
    )
}
