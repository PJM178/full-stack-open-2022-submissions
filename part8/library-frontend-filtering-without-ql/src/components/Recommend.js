import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { USER, ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const [booksToFilter, setBooksToFilter] = useState(null)
  const user = useQuery(USER)
  const books = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (books.data !== undefined && user.data.me !== null) {
      const filteredBooks = books.data.allBooks.filter(({ genres }) => genres.find(genre => genre.toLowerCase() === String(user.data.me.favouriteGenre).toLowerCase()))
      setBooksToFilter(filteredBooks)
    }
  },[user, books])
 

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <div style={{ fontWeight: 'bold', display: 'inline-block' }}>{user.data.me.favouriteGenre}</div></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToFilter ? booksToFilter.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))
          : null }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend