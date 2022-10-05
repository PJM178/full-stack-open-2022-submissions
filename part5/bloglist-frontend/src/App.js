import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [messageClass, setMessageClass] = useState('')

  // load all the blogs from the database
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // sort the posts - descending
  blogs.sort((a, b) => a.likes - b.likes)
  blogs.reverse()

  // maintain user logged in by checking local storage for token and setting the token for authorization
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // add new blogs
  const addBlog = async (blogObject) => {
    const response = await blogService.newEntry(blogObject)
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(response))
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  // update a blog - likes
  const updateBlog = async (id, blogObject, name) => {
    const response = await blogService.updateBlog(id, blogObject, name)
    setBlogs(blogs.map(blog => blog.title.toLowerCase() !== response.title.toLowerCase() ? blog : response))
  }

  // delete a blog
  const deleteBlog = (id) => {
    blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  // log in
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log(exception)
      setMessage('wrong username or password')
      setMessageClass('error')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
      setUsername('')
      setPassword('')
    }
  }

  // toggle visibility with the component
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel={'show'} ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  // not logged in, show the log in form
  if (user === null) {
    return (
      <div>
        <h1>Log in to the application</h1>
        <Notification message={message} messageClass={messageClass} />
        <p></p>
        <LoginForm username={username} handleLogin={handleLogin} setUsername={setUsername}
          password={password} setPassword={setPassword} />
      </div>
    )
  }

  // logged in, show them the posts as well as allow adding new posts
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageClass={messageClass} />
      <form onSubmit={() => window.localStorage.removeItem('loggedBlogUser')}>
        <p>{user.name} logged in<button type="submit">logout</button></p>
      </form>
      <div>
        {blogForm()}
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogUpdate={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default App