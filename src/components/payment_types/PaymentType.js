import React from 'react'
import ApiManager from '../../api/ApiManager'

export default function PaymentType(props) {

//  const deletePayment = (props, paymentType) => {
//     ApiManager.destroyPayment(paymentType)
//     .then(props.history.push("/paymenttypes"))
//   } 

    return (
      <div>
        <p>Merchant Name: {props.paymentType.merchant_name}</p>
        <p>Account Number: {props.paymentType.account_number}</p>
        <p>Expiration Date: {props.paymentType.expiration_date}</p>
        <button className="btn btn-danger" id={props.paymentType.id}>Delete Payment(inprogress)</button>
      </div>
    )
}
