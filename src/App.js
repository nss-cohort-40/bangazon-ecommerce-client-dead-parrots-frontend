import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import ApplicationViews from './ApplicationViews'
import Navbar from './navbar/Navbar'

function App(props) {

  const [currentUser, setCurrentUser] = useState(false)

  return (
    <>
      <Route render={props => {
        return <Navbar {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      }} />
      <ApplicationViews currentUser={currentUser} setCurrentUser={setCurrentUser} {...props} />
    </>
  )
}

export default App
