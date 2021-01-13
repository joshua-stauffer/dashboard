import './App.css';
import React from 'react';
import { useState } from 'react';
import { Dashboard } from './components/dashboard/dashboard'
import { Login } from './components/dashboard/login';

function App() {
  const [token, setToken] = useState(null)
  const [logoutMsg, setLogoutMsg] = useState('')
  const logout = (msg) => {
    setLogoutMsg(msg)
    setToken(null);
  }

  if (!token) {
    return <Login setToken={setToken} msg={logoutMsg}/>
  }

  return (
    <Dashboard token={token} logout={logout}/>
  )
}



export default App;
