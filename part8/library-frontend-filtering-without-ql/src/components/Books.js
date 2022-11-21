import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const books = useQuery(ALL_BOOKS)
  const [genreList, setGenreList] = useState([])
  const [bookList, setBookList] = useState([])
  const [temporaryBooks, setTemporaryBooks] = useState([])

  useEffect(() => {
    if (books.data !== undefined && genreList.length === 0) {
      for (let i = 0; i < books.data.allBooks.length; i++) {
        books.data.allBooks[i].genres.forEach(genre => setGenreList(genreList.push(genre)))
      }
      setGenreList([...new Set(genreList)])
      setBookList(books.data.allBooks)
    } else if (books.data !== undefined) {
      setBookList(books.data.allBooks)
    }
  },[genreList, books])

  if (books.data !== undefined && bookList.length !== 0 && books.data.allBooks.length > temporaryBooks.length) {
    for (let i = 0; i < books.data.allBooks.length; i++) {
      books.data.allBooks[i].genres.forEach(genre => setGenreList(genreList.push(genre)))
    }
    setGenreList([...new Set(genreList)])
    setTemporaryBooks(books.data.allBooks)
  }
  
  const filterBooks = (g) => {
    if (g) {
      const filteredBooks = books.data.allBooks.filter(({ genres }) => genres.find(genre => genre.toLowerCase() === g.toLowerCase()))
      setBookList(filteredBooks)
    } else {
      setBookList(books.data.allBooks)
    }
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genreList.map((genre, i) => (
        <button key={i} onClick={() => filterBooks(genre)}>{genre.toLowerCase()}</button>
      ))}
      <button onClick={() => filterBooks()}>all genres</button>
    </div>
  )
}

export default Books
