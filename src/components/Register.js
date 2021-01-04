import axios from 'axios'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function Register ({ auth, onRegister }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [feedbackMsg, setFeedbackMsg] = useState('')

  function handleSubmit (event) {
    event.preventDefault()

    axios.post('https://this-land-team-5.herokuapp.com/api/userpass/', {
      username: username,
      password: password
    })
      .then(response => {
        setFeedbackMsg({ type: 'success', message: 'User successfully created.' })
        onRegister({ username, password })
      })
      .catch(error => {
        setFeedbackMsg({ type: 'error', message: 'This user already exists' })
        console.log(error)
      })
  }

  if (auth) {
    return <Redirect to='/' />
  }

  return (
    <div className='bg-img2'>
      <div className='Register'>
        <h1 className='f2 b black'>Sign Up or <Link to='/login'>Log In</Link></h1>

        <form
          onSubmit={handleSubmit}
          className='container'
        >
          {
          feedbackMsg &&
          (
            <div className={clsx(
              'ba', 'bw1', 'pa3', 'w-50',
              {
                'bg-white': (feedbackMsg.type === 'error'),
                'bg-washed-red': (feedbackMsg.type === 'success')
              }
            )}
            >
              {feedbackMsg.message}
            </div>
          )

            }
          <label className='db b mv2 black' htmlFor='username'>Username</label>
          <input
            required
            type='text'
            placeholder='Enter Username'
            id='username'
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <div className='mv2'>
            <label className='db b mv2 black' htmlFor='password'>Password</label>
            <input
              required
              type='password'
              placeholder='Enter Password'
              id='password'
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
          <div className='button'>
            <button type='submit'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>

  )
}
