// UNUSED FOR NOW

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    newComment(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setComments, newComment } = commentSlice.actions

export const initializeCommentsAction = content => {
  return async dispatch => {
    const blog = await blogService.getBlog()
    console.log(blog)
    dispatch(setComments(blog.comments))
  }
}

export const newCommentAction = content => {
  return async dispatch => {
    console.log(content)
    const newComment = await blogService.newComment(content)
    console.log(newComment)
    dispatch(newComment(newComment))
  }
}

export default commentSlice.reducer