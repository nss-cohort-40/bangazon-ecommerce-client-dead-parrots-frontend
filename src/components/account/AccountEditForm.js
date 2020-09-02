import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AccountEditForm = props => {
  const [modal, setModal] = useState(true);

  const toggle = () => {
    props.setFormOpen(false);
    setModal(!modal);
  }

  useEffect(() => {
    props.getCustomer()}, []);

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
                // value={plantType}
                // onChange={this.typeChange}
              />
            </div>
        </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AccountEditForm;
