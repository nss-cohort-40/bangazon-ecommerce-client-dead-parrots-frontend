import React, {useState, useEffect } from 'react'

export default function OrderHistoryList() {

  const [orders, setOrders] = useState([])


  const getOrderHistory = () => {
      fetch(`http://localhost:8000/orders?history`, {
          "method": "GET",
          "headers": {
              "Accept": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(res => res.json())
      .then(orders => {
        let orderHistory = orders.filter(order => order.payment_type !== null)
        console.log(orderHistory)
        setOrders(orderHistory)
      })
  }

  useEffect(getOrderHistory, [])

  return (
      <div>
        <p>Order History</p>
         {orders.map(order => <div key={order.id}>
         <a href={`/order/${order.id}`}>Order Number: {order.id}</a>
         </div>
         )}
      </div>
  )
}
