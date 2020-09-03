import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountEditForm from './AccountEditForm';
import ApiManager from '../../api/ApiManager';
import PaymentTypeList from '../payment_types/PaymentTypeList';

const Account = props => {

  const [ customerDetails , setCustomerDetails ] = useState({ user: {} });
  const [ formOpen, setFormOpen ] = useState( false )

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
            <button onClick={() => setFormOpen(true)}>Edit Account</button>
            { formOpen ? <AccountEditForm setFormOpen={ setFormOpen } getCustomer={ getCustomer }/> : '' } 
        </div>
    )
};

export default Account;
