import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', timer: null, messageType: '' }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload
      console.log(notification)
      console.log(notification)
      if (state.timer) {
        clearTimeout(state.timer)
      }
      return { ...state, message: notification.content, timer: notification.timer, messageType: notification.messageType }
    }
  }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (content, timeout, messageType) => {
  return async dispatch => {
    console.log(content)
    console.log(timeout)
    console.log(messageType)
    const timer = setTimeout(
      () => dispatch(createNotification(initialState)), 1000 * timeout
    )
    dispatch(createNotification({ content, timer, messageType }))
  }
}

export default notificationSlice.reducer