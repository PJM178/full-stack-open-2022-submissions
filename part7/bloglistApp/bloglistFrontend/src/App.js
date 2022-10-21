import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { setUsersAction } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoggedInUser from './components/LoggedInUser'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import Blog from './components/Blog'

const footerAnimation = keyframes`
  0% { background-color: red; }
  50% { background-color: yellow; }
  100% { background-color: red; }
`

const Footer = styled.div`
  background-color: lightgray;
  padding: 0.5em;
  margin-top: 1em;
  animation-name: ${footerAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
`

const App = () => {
  const dispatch = useDispatch()
  const userRedux = useSelector(state => state.user)
  console.log('tikka', userRedux)

  // load all the blogs from the database
  // maintain user logged in by checking local storage for token and setting the token for authorization
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
    dispatch(initializeBlogs())
    dispatch(setUsersAction())
  }, [dispatch])

  // toggle visibility of the blog form
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel={'Create new'} ref={blogFormRef}>
      <BlogForm togglableState={blogFormRef} />
    </Togglable>
  )

  // not logged in, show the login form
  if (window.localStorage.getItem('loggedBlogUser') === null) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={
            <div>
              <h1>Log in to the application</h1>
              <Notification />
              <p></p>
              <LoginForm />
            </div> }
          />
        </Routes>
      </Router>
    )
  }

  // logged in, show all the blogs
  return (
    <Router>
      <div className='navigationBar'>
        <div className='navigationBarElement'><Link to='/blogs'>blogs</Link></div>
        <div className='navigationBarElement'><Link to='/users'>users</Link></div>
        <div style={{ marginLeft: 'auto', marginRight: '5px' }}><LoggedInUser /></div>
      </div>
      <Notification />
      <Routes>
        <Route path='/blogs' element={
          <div>
            <h2>blogs</h2>
            <div>
              {blogForm()}
            </div>
            <Blogs />
          </div> }
        />
        <Route path='/blogs/:id' element={
          <div>
            <Blog />
          </div> }
        />
        <Route path='/users' element={
          <div>
            <h2>Users</h2>
            <Users />
          </div> }
        />
        <Route path='/users/:id' element={
          <div>
            <User />
          </div> }
        />
      </Routes>
      <Footer>
        <em>Made by Petri montonen - Full Stack Open 2022</em>
      </Footer>
    </Router>
  )
}

export default App