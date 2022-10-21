import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ togglableState }) => {
  const dispatch = useDispatch()
  // const user = useSelector(state => state.user)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogContent = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(blogContent))
    togglableState.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
        Title:
          <input
            id='formTitle'
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => {setTitle(target.value)}}
          />
        </div>
        <div>
          Author:
          <input
            id='formAuthor'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => {setAuthor(target.value)}}
          />
        </div>
        <div>
          Url:
          <input
            id='formUrl'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => {setUrl(target.value)}}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default BlogForm