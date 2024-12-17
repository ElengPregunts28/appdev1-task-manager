import { Component, useEffect, useState } from 'react';
import './App.css';
import ListTask from './Components/ListTask';
import { BrowserRouter, Routes, Route } from 'react-router';
import { SignUp } from './Components/Signup';
import { SignIn } from './Components/Signin';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from './Firebase';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(authentication, (user) => {
      setUser(user)
    })

    return unsubcribe
  }, [])
 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <ListTask user={user} /> : <SignIn />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </ Routes>
      </ BrowserRouter>
    </>
  )
}

export default App
