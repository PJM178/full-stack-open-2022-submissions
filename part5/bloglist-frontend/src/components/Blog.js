import { useState } from 'react'

const Blog = ({ blog, blogUpdate, deleteBlog, user }) => {
  const [visible, setVisible] = useState(true)
  const [buttonStyle, setButtonStyle] = useState('view')
  const [like, setLike] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : 'block' }

  const toggleVisibility = () => {
    setVisible(!visible)
    visible ? setButtonStyle('hide') : setButtonStyle('view')
  }

  // styling
  const blogStyle = {
    border: '2px solid',
    marginBottom: '5px',
    paddingTop: '5px'
  }

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: like + 1,
    user: blog.user.id
  }

  const clickBlogUpdate = () => {
    blogUpdate(blog.id, updatedBlog, blog)
    setLike(like + 1)
  }

  return (
    <div style={blogStyle} className='blogContainer'>
      <div style={{ marginLeft: '2px' }}>
        <div className='blog'>
          {blog.title} {blog.author} <button onClick={toggleVisibility} type='button'>{buttonStyle}</button>
        </div>
        <div style={hideWhenVisible} className='moreInfo'>
          <div>{blog.url}</div>
          <div>likes {like} <button onClick={clickBlogUpdate} type='button' id='likeBlog'>like</button></div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username
            ? <button onClick={() => window.confirm(`remove blog ${blog.title} by ${blog.author}?`) === true ? deleteBlog(blog.id) : null} type='button' id='deleteBlogButton'>delete</button>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Blog