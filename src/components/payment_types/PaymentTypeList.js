import React, { useState, useEffect } from 'react';
import ApiManager from '../../api/ApiManager';
import PaymentType from './PaymentType';

export default function PaymentTypeList() {

  const [ paymentTypes, setPaymentTypes ] = useState([]);

  const getPaymentTypes = () => {
    ApiManager.getPaymentTypes()
    .then((paymentTypes) => {
      setPaymentTypes(paymentTypes)
    })
  };

  useEffect(() => {
    getPaymentTypes()}, []
  );

    return (
        <div>
          <h2>Payment Types</h2>
          {paymentTypes.map(paymentType => <PaymentType key={paymentType.id} paymentType={paymentType} />)}
        </div>
    )
};
