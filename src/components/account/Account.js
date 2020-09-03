import React, { useState, useEffect } from 'react';
import AccountEditForm from './AccountEditForm';
import ApiManager from '../../api/ApiManager';
import PaymentTypeForm from '../payment_types/PaymentTypeForm';

const Account = props => {

  const [ customerDetails , setCustomerDetails ] = useState({ user: {} });
  const [ accountFormOpen, setAccountFormOpen ] = useState( false )
  const [ paymentFormOpen, setPaymentFormOpen ] = useState( false )

  const getCustomer = () => {
    ApiManager.getCurrentCustomer()
    .then((customer) => {
        setCustomerDetails(customer[0])
    })
}

  useEffect(() => {
    getCustomer()}, []);

    return (
        <div>
            <h2>Account</h2>
            <p>Username: {customerDetails.user.username}</p>
            <p>First Name: {customerDetails.user.first_name}</p>
            <p>Last Name: {customerDetails.user.last_name}</p>
            <p>Address: {customerDetails.address}</p>
            <p>Phone Number: {customerDetails.phone_number}</p>
            <a className="btn btn-primary" href="/paymentTypes">Payment Types</a>
            <a className="btn btn-success" href="/orderHistory">Order History</a>
            <button onClick={() => setAccountFormOpen(true)}>Edit Account</button>
            { accountFormOpen ? <AccountEditForm setAccountFormOpen={ setAccountFormOpen } getCustomer={ getCustomer }/> : '' } 
            <button onClick={() => setPaymentFormOpen(true)}>Add Payment Option</button>
            { paymentFormOpen ? <PaymentTypeForm setPaymentFormOpen={ setPaymentFormOpen } getCustomer={ getCustomer }/> : '' } 
        </div>
    )
};

export default Account;
