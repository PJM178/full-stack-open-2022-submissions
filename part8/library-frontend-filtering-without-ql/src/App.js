import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  console.log(result)

  useEffect(() => {
    const storageToken = setToken(localStorage.getItem('library-user-token'))
    if (storageToken) {
      setToken(storageToken)
    }
  },[])

  const logout = () => {
    localStorage.removeItem('library-user-token')
    setToken(null)
    document.querySelector('#books').click()
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button id='books' onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> : null}
        {token ? <button onClick={() => setPage('recommend')}>recommend</button> : null}
        {!token ? <button onClick={() => setPage('login')}>login</button> : null}
        {token ? <button onClick={logout}>logout</button> : null}
      </div>
      {result.data.allAuthors.length > 0 ? <Authors show={page === 'authors'} token={token} /> : null}
      {result.data.allAuthors.length > 0 ? <Books show={page === 'books'} /> : null}
      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'} setToken={setToken} />
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
