import React, { useRef, useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ApiManager from '../../api/ApiManager';


export default function PaymentTypeForm(props) {
    const [modal, setModal] = useState(true);
    const merchantName = useRef();
    const accountNumber = useRef();
    const expirationDate = useRef();

    const toggle = () => {
      props.setPaymentFormOpen(false);
      setModal(!modal);
    }

    const savePayment = (e) => {
      e.preventDefault();
      const today = Date.now()
      const expDate = Date.parse(expirationDate.current.value)
      if (today < expDate) {
        const newPayment = {
          merchant_name: merchantName.current.value,
          account_number: accountNumber.current.value,
          expiration_date: expirationDate.current.value
        }
        ApiManager.postPayment(newPayment)
          .then(toggle())
        } 
        else {
          alert('Payment Type is expired! Please try again.')
        }
    }

    return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Payment Type</ModalHeader>
        <ModalBody>
          <form className="col-8 offset-2 text-left">
            <div className="form-group">
            <label htmlFor="merchant-name"><strong>Merchant Name</strong></label>
            <input
                type="text"
                className="form-control"
                id="merchant-name"
                ref={merchantName}
            />
            </div>
            <div className="form-group">
            <label htmlFor="account-number"><strong>Account Number</strong></label>
            <input
                type="number"
                className="form-control"
                id="account-number"
                ref={accountNumber}
            />
            </div>
            <div className="form-group">
            <label htmlFor="expiration-date"><strong>Expirtation Date</strong></label>
            <input
                type="date"
                className="form-control"
                id="expiration-date"
                ref={expirationDate}
            />
            </div>
            <button color="primary" onClick={savePayment}>Save Payment</button>
          </form>
        </ModalBody>
      </Modal>
    </div>
    )
}
