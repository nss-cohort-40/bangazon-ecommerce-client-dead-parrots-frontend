import React, { useState, useEffect } from 'react';
import AccountEditForm from './AccountEditForm';

const Account = props => {

  const [ customerDetails , setCustomerDetails ] = useState({ user: {} });
  const [ formOpen, setFormOpen ] = useState( false )

  const getCustomer = () => {
    return fetch("http://127.0.0.1:8000/customers", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `token ${localStorage.getItem('bangazon_token')}`
      }
    })
      .then(response => response.json())
      .then((customer) => {
        setCustomerDetails(customer[0]);
      })
  };

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
            <button onClick={() => setFormOpen(true)}>Edit Account</button>
            { formOpen ? <AccountEditForm setFormOpen={ setFormOpen } getCustomer={ getCustomer }/> : '' } 
        </div>
    )
};

export default Account;
