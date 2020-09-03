const remoteURL = 'http://localhost:8000'

export default {
    getCurrentCustomer() {
        return fetch(`${remoteURL}/customers`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(response => response.json())
    },
    getProductTypes() {
        return fetch(`${remoteURL}/producttypes`).then(data => data.json())
    },
    postNewProduct(product) {
        return fetch(`${remoteURL}/products`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem('bangazon_token')}`
            },
            body: JSON.stringify(product)
        })
    },
    putCustomer(customer) {
        return fetch(`${remoteURL}/customers/${customer.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${localStorage.getItem('bangazon_token')}`
            },
            body: JSON.stringify(customer)
        })
    },
    getPaymentTypes() {
        return fetch(`${remoteURL}/paymenttypes`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
            .then(response => response.json())
    },
    postPayment(payment) {
      return fetch(`${remoteURL}/paymenttypes`, {
        method: 'POST',
        headers: {
            'Content-type': "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem('bangazon_token')}`
        },
        body: JSON.stringify(payment)
    })
  },
//   destroyPayment(payment) {
//     return fetch(`${remoteURL}/paymenttypes${payment.id}`, {
//       method: 'DELETE',
//       headers: {
//           'Content-type': "application/json",
//           "Accept": "application/json",
//           "Authorization": `Token ${localStorage.getItem('bangazon_token')}`
//       },
//   })
// },  
};
