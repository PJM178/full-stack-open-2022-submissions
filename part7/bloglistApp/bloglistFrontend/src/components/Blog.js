import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog, newComment } from '../reducers/blogsReducer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const [commentField, setCommentField] = useState('')
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blog = blogs.find(blog => blog.id === id)
  console.log('component: blog', blog)
  console.log('component: blog', user)

  const handleComment = async (event) => {
    event.preventDefault()
    const content = {
      blog: blog,
      comment: commentField
    }
    dispatch(newComment(content))
    setCommentField('')
  }

  // update blog - likes
  const clickBlogUpdate = (blog) => {
    const updatedBlog = {
      ...blog, likes: blog.likes + 1
    }
    dispatch(likeBlog(updatedBlog))
  }

  // update blog - delete
  const clickDeleteBlog = (blog) => {
    return window.confirm(`remove blog ${blog.title} by ${blog.author}?`) === true
      ? (dispatch(removeBlog(blog.id)), navigate('/blogs'))
      : null
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => clickBlogUpdate(blog)} type='button' id='likeBlog'>like</button></div>
      <div>added by {blog.user.username} {blog.user.username === user.username
        ? <button onClick={() => clickDeleteBlog(blog)}>delete</button>
        : null
      }
      </div>
      <h3>Comments</h3>
      <form>
        <input id='username' type="text" value={commentField} name="Comment" onChange={({ target }) => {setCommentField(target.value)}} /><button type='submit' onClick={handleComment}>Add comment</button>
      </form>
      {blog.comments.map(comment =>
        <div key={comment._id}>{comment.comment}</div>)}
    </div>
  )
}

export default Blog