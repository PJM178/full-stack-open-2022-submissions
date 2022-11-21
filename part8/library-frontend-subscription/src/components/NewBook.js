import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { NEW_BOOK, ALL_AUTHORS, FILTERED_BOOKS, RECOMMEND_BOOKS, UNIQUE_GENRES } from '../queries'

import { uniqueItem } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // cache with refetching
  // const [ newBook ] = useMutation(NEW_BOOK, {
  //   // refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }, 
  //   //   { query: FILTERED_BOOKS }, { query: UNIQUE_GENRES }, { query: RECOMMEND_BOOKS }],
  //   onError: (error) => {
  //     console.log(error)
  //   }
  // })
  // cache with update callback function
  const [ newBook ] = useMutation(NEW_BOOK, {
    onError: (error) => {
      console.log(error)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        if (allAuthors.find(author => author.name === response.data.addBook.author.name)) {
          const updatedAuthors = allAuthors.map(author => 
            author.name === response.data.addBook.author
            ? { ...author, bookCount: author.bookCount + 1}
            : author
          )
          return {
            allAuthors: updatedAuthors
          }
        }
        // else add the object to the array
        return {
          allAuthors: allAuthors.concat(response.data.addBook.author)
        }
      })
      // make it so that it's not added if already exists in the cache - use the 
      // course function as a base
      cache.updateQuery({ query: FILTERED_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: uniqueItem(allBooks.concat(response.data.addBook))
        }
      })
      cache.updateQuery({ query: RECOMMEND_BOOKS }, ({ recommendBook }) => {
        return {
          recommendBook: uniqueItem(recommendBook.concat(response.data.addBook))
        }
      })
      cache.updateQuery({ query: UNIQUE_GENRES }, ({ uniqueGenres }) => {
        const getGenres = [...new Set(response.data.addBook.genres.map(genre => genre))]
        const allGenres = getGenres.concat(uniqueGenres)
        const newGenres = [...new Set(allGenres.map(genre => genre))]
        // kirjoita funktio, joka ottaa genren stringit ja lisää ne, jos eivät jo ole
        return {
           uniqueGenres: newGenres
        }
      })
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    await newBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
