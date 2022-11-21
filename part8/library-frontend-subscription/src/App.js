import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import Notification from './components/Notification'

import { ALL_AUTHORS, BOOK_ADDED, FILTERED_BOOKS, RECOMMEND_BOOKS, UNIQUE_GENRES } from './queries'

// cache manipulation function - example from course, helper function
export const uniqueItem = (items) => {
  // set allows only for unique values
  let seen = new Set()
  return items.filter((item) => {
    let a = item.title
    return seen.has(a) ? false : seen.add(a)
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  useQuery(RECOMMEND_BOOKS)
  useQuery(FILTERED_BOOKS)
  useQuery(UNIQUE_GENRES)
  
  useEffect(() => {
    const storageToken = setToken(localStorage.getItem('library-user-token'))
    if (storageToken) {
      setToken(storageToken)
    }
  },[])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const bookAdded = data.data.bookAdded
      setNotification(`Book "${data.data.bookAdded.title}" added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        // if the author already exists, update the bookcount
        if (allAuthors.find(author => author.name === bookAdded.author.name)) {
          const updatedAuthors = allAuthors.map(author => 
            author.name === bookAdded.author.name
            ? { ...author, bookCount: author.bookCount + 1}
            : author
          )
          return {
            allAuthors: updatedAuthors
          }
        }
        // else add the object to the array
        return {
          allAuthors: allAuthors.concat(bookAdded.author)
        }
      })
      client.cache.updateQuery({ query: FILTERED_BOOKS }, ({ allBooks }) => {
        return {
          // use the helper function to check if already in the cache
          allBooks: uniqueItem(allBooks.concat(bookAdded))
        }
      })
      client.cache.updateQuery({ query: RECOMMEND_BOOKS }, ({ recommendBook }) => {
        return {
          recommendBook: recommendBook.concat(bookAdded)
        }
      })
      client.cache.updateQuery({ query: UNIQUE_GENRES }, ({ uniqueGenres }) => {
        const getGenres = [...new Set(bookAdded.genres.map(genre => genre))]
        const allGenres = getGenres.concat(uniqueGenres)
        const newGenres = [...new Set(allGenres.map(genre => genre))]
        // kirjoita funktio, joka ottaa genren stringit ja lisää ne, jos eivät jo ole
        return {
           uniqueGenres: newGenres
        }
      })
    }
  })

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
      <Notification notification={notification} setNotification={setNotification} />
      {result.data.allAuthors.length > 0 ? <Authors show={page === 'authors'} token={token} /> : null}
      {result.data.allAuthors.length > 0 ? <Books show={page === 'books'} /> : null}
      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'} setToken={setToken} />
      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App
