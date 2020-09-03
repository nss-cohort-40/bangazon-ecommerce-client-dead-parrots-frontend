import React from 'react'

export default function PaymentType(props) {
    return (
      <div>
        <p>Merchant Name: {props.paymentType.merchant_name}</p>
        <p>Account Number: {props.paymentType.account_number}</p>
        <p>Expiration Date: {props.paymentType.expiration_date}</p>
        <button className="btn btn-danger" id={props.paymentType.id}>Delete Payment</button>
      </div>
    )
}
