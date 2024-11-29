import { Component, useState } from 'react'
import './App.css'
import ListTask from './Components/ListTask'; 

function App() {
  const [user, setUser] = useState('User!')
  return (
    <>
      <h1>Welcome {user}</h1>
      {user ? (
        <ListTask />
      ) : (
        <p>You must login to view the task lists</p>
      )}
    </>
  )
}

export default App
