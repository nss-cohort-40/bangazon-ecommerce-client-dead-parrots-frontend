import React from 'react'
import ApiManager from '../../api/ApiManager'

export default function PaymentType(props) {

  const deletePayment = (e) => {
      const paymentId = e.target.id
      ApiManager.destroyPayment(paymentId)
      .then(props.getPaymentTypes)
      .then(() => props.history.push('/paymentTypes'))
  } 

    return (
      <div>
        <p>Merchant Name: {props.paymentType.merchant_name}</p>
        <p>Account Number: {props.paymentType.account_number}</p>
        <p>Expiration Date: {props.paymentType.expiration_date}</p>
        <button className="btn btn-danger" onClick={deletePayment} id={props.paymentType.id}>Delete Payment</button>
      </div>
    )
}
