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
       fetch(`http://localhost:8000/orders/${order.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${localStorage.getItem('bangazon_token')}`
        }
      })
      // return fetch(`http://localhost:8000/products`)
      // .then(props.history.push('/'))
    }  
    const removeProduct = (product_order_id, product_url) => {
        fetch(`http://localhost:8000/orderproducts/${product_order_id}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        }).then(() => {
                let product_id = product_url.split('products/')[1]
                return fetch(`http://localhost:8000/products/${product_id}`, {
                'method': 'PUT',
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem("bangazon_token")}`
                },
                'body': JSON.stringify({
                    product_id: product_id
                })
            })
        }).then(getProductsOrder)
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
                {productOrders.map(productorder => <div key={productorder.id}>
                <ProductCard key={productorder.id} product={productorder.product} {...props} />
                {console.log(productorder.product)}
                <button onClick={() => removeProduct(productorder.id, productorder.product.url)}>Remove from Cart</button>
                </div>)}
            </div>
            <button onClick={cancelOrder}>Cancel Order</button>
        </>
    )
}
