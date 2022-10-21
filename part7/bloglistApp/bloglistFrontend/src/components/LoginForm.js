import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password
    }
    dispatch(loginUser(user))
    setUsername('')
    setPassword('')
    navigate('/blogs')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          placeholder='username...'
          onChange={({ target }) => {setUsername(target.value)}}
        />
      </div>
      <div>
        Password:
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          placeholder='password...'
          onChange={({ target }) => {setPassword(target.value)}}
        />
      </div>
      <button type="submit" id='login-button'>Login</button>
    </form>
  )
}

export default LoginForm