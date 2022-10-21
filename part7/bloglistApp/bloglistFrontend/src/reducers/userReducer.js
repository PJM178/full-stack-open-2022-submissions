import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

// const initialState = { username: '', name: '', token: '' }

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUserAction(state, action) {
      return action.payload
    },
    loginUserAction(state, action) {
      return action.payload
    },
    setUsers(state, action) {
      console.log(action.payload)
      return action.payload
    }
  }
})

export const { loginUserAction, setUserAction, setUsers } = userSlice.actions

export const setUser = content => {
  return async dispatch => {
    dispatch(setUserAction(content))
  }
}

export const setUsersAction = content => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log(users)
    dispatch(setUsers(users))
  }
}

export const loginUser = content => {
  return async dispatch => {
    const { username, password } = content
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUserAction(user))
    } catch(exception) {
      dispatch(setNotification('wrong username or password', 3, 'error'))
    }
  }
}



export default userSlice.reducer