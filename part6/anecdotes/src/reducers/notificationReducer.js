import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '' }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      return {...state, message: content}
    }
  }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return async dispatch => {
    console.log(content)
    dispatch(createNotification(content))
    await new Promise((resolve) => setTimeout(resolve, timeout * 1000))
    dispatch(createNotification(''))
  }
}

export default notificationSlice.reducer