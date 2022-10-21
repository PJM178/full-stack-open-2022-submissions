// import { useDispatch, useSelector } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { setUser } from '../reducers/userReducer'

const LoggedInUser = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  // const dispatch = useDispatch()

  // logout user
  const logoutUser = (event) => {
    // event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    navigate('/')
  }

  return (
    <form onSubmit={logoutUser}>
      {user.name} logged in<button type="submit">logout</button>
    </form>
  )
}

export default LoggedInUser