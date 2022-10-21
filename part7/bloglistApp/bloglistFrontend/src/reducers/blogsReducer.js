import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    updateBlog(state, action) {
      const id = action.payload.id
      console.log(id)
      const blogToChange = state.find(blog => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      console.log(action)
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog)
    },
    commentBlog(state, action) {
      const id = action.payload.id
      console.log(id)
      const blogToChange = state.find(blog => blog.id === id)
      console.log(blogToChange)
      const changedBlog = action.payload
      console.log(action.payload)
      console.log(changedBlog)
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog)
    }
  }
})

export const { setBlogs, appendBlog, deleteBlog, updateBlog, commentBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log(blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    console.log(content)
    const newBlog = await blogService.newEntry(content)
    console.log(newBlog)
    dispatch(appendBlog(newBlog))
  }
}

export const newComment = content => {
  return async dispatch => {
    console.log(content)
    await blogService.newComment(content)
    const blog = await blogService.getBlog(content.blog.id)
    // console.log(blog)
    dispatch(commentBlog(blog))
  }
}

export const removeBlog = content => {
  return async dispatch => {
    await blogService.deleteBlog(content)
    dispatch(deleteBlog(content))
  }
}

export const likeBlog = content => {
  return async dispatch => {
    console.log(content)
    const updatedBlog = await blogService.updateBlog(content)
    console.log(updateBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export default blogSlice.reducer