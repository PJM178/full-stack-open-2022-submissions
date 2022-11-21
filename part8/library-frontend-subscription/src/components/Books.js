import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { FILTERED_BOOKS, UNIQUE_GENRES } from '../queries'

const Books = (props) => {
  const [genreToFilter, setGenreToFilter] = useState()

  const uniqueGenres = useQuery(UNIQUE_GENRES)
  const filteredBooks = useQuery(FILTERED_BOOKS, {
    variables: { genre: genreToFilter }
  })

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
          {filteredBooks.data !== undefined 
            ? filteredBooks.data.allBooks.map((a, i) => (
            <tr key={i}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            ))
            : null}
        </tbody>
      </table>
      {uniqueGenres.data !== undefined 
        ? uniqueGenres.data.uniqueGenres.map((genre, i) => (
        genre === '' ? null : <button key={i} onClick={() => setGenreToFilter(genre)}>{genre}</button>
      ))
      : null }
      <button onClick={() => setGenreToFilter()}>All genres</button>
    </div>
  )
}

export default Books
