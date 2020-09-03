import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom'
import ApplicationViews from './ApplicationViews'
import Navbar from './navbar/Navbar'

function App(props) {

  const [currentUser, setCurrentUser] = useState(false)
  // const [searchTerm, setSearchTerm] = useState('')

  const [products, setProducts] = useState([])

  const search = (event, searchTerm) => {
    event.preventDefault();
    return fetch(`http://127.0.0.1:8000/products?search=${searchTerm}`)       
        .then(res => res.json())
        .then((res) => setProducts(res))
        .then(() => props.history.push("/search"))
}

  return (
    <>
      <Route render={props => {
        return <Navbar {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} search={search}/>
      }} />
      <ApplicationViews currentUser={currentUser} setCurrentUser={setCurrentUser} products={products} {...props} />
    </>
  )
}

export default withRouter(App);
