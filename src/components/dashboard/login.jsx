import { useState, useEffect } from 'react';

export function Login({ setToken, msg }) {

  const [username, setUsername] = useState('')
  const updateUsername = e => {
    setUsername(e.target.value)
  }

  const [password, setPassword] = useState('')
  const updatePassword = e => {
    setPassword(e.target.value)
  }

  const [errorMsg, setErrorMsg] = useState('')

  const [submit, setSubmit] = useState(false)
  useEffect(() => {
    if (!submit) return
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(
        {
          username: username,
          password: password
        }
      )
    }).then(r => r.json())
      .then(token => {
        if (token.access_token) {
          setToken(token.access_token)
          setErrorMsg('')
        } else {
          setErrorMsg('Incorrect Username or Password')
        }
      })
      .catch(error => {
        setErrorMsg('Incorrect Username or Password')
      })

    setSubmit(false)
    setUsername('')
    setPassword('') 
  })

  return (
    <main className='main-dashboard'>

      <div className='overview'>
        <div className='overview-header'>
          <h1 className='overview-header-h1'>Dashboard</h1>
        </div>
        <p>{ errorMsg }</p>
        { msg ? <p> { msg }</p> : null}
        <div className='login-box'>
          <label>
            <p>Username: </p>
            <input type='text' value={username} onChange={updateUsername}/>
          </label>
          <label>
            <p>Password:  </p>
            <input type='password' value={password} onChange={updatePassword}/>
          </label>
        <button onClick={() => setSubmit(true)}>Submit</button>
        </div>
      </div>
    </main>
    
  )
}