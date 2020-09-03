import React, { useState, useEffect, useRef } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ApiManager from '../../api/ApiManager';

const AccountEditForm = props => {
  const [modal, setModal] = useState(true);
  const [ customer, setCustomer ] = useState({ user: {} });
  const firstName = useRef();
  const lastName = useRef();
  const phoneNum = useRef();
  const addy = useRef();

  const getCustomerForForm = () => {
    ApiManager.getCurrentCustomer()
    .then((customer) => {
        setCustomer(customer[0])
    })
}

  const toggle = () => {
    props.setAccountFormOpen(false);
    setModal(!modal);
  }

  const updateCustomer = (e) => {
      e.preventDefault();
      const modifiedCustomer = {
          id: customer.id,
          address: addy.current.value,
          phone_number: phoneNum.current.value,
          first_name: firstName.current.value,
          last_name: lastName.current.value
      }
      console.log('customer state', customer)
      console.log('modified customer', modifiedCustomer)
      ApiManager.putCustomer(modifiedCustomer)
      .then(props.getCustomer())
      .then(toggle())
  };

  useEffect(() => {
    getCustomerForForm()}, []);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Account Edit Form</ModalHeader>
        <ModalBody>
        <form className="col-8 offset-2 text-left">
            <div className="form-group">
              <label htmlFor="first-name"><strong>First Name</strong></label>
              <input
                type="text"
                className="form-control"
                id="first-name"
                ref={firstName}
                defaultValue={customer.user.first_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name"><strong>Last Name</strong></label>
              <input
                type="text"
                className="form-control"
                id="last-name"
                ref={lastName}
                defaultValue={customer.user.last_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address"><strong>Address</strong></label>
              <input
                type="text"
                className="form-control"
                id="address"
                ref={addy}
                defaultValue={customer.address}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone-number"><strong>Phone Number</strong></label>
              <input
                type="text"
                className="form-control"
                id="phone-number"
                ref={phoneNum}
                defaultValue={customer.phone_number}
              />
            </div>
            <button color="primary" onClick={updateCustomer}>Update Profile</button>
        </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AccountEditForm;
