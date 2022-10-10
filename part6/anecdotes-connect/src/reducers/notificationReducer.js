import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', timer: null }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      if (state.timer) {
        clearTimeout(state.timer)
      }
      console.log(state.timer)
      console.log(state.message)
      return {...state, message: content.content, timer: content.timer}
    }
  }
})

export const { createNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return async dispatch => {
    // dispatch(createNotification(content))
    // await new Promise((resolve) => setTimeout(resolve, timeout * 1000))
    // dispatch(createNotification(''))
    const timer = setTimeout(
      () => dispatch(createNotification(initialState)), 1000 * timeout
    )
    dispatch(createNotification({ content, timer }))
  }
}

export default notificationSlice.reducer