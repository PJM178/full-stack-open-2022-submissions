import { gql } from '@apollo/client'

// Fragments
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    genres
    author {
      name
      born
      bookCount
    }
    published
  }
`

// Queries
export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      genres,
      author {
        name,
        born,
        bookCount
      },
      published
    }
  }
`

export const FILTERED_BOOKS = gql`
  query filteredBooks($genre: String) {
    allBooks(genre: $genre) {
      title,
      genres,
      author {
        born
        name,
        bookCount
      },
      published
    }
  }
`

export const USER = gql`
  query getUser($token: String) {
    me(token: $token) {
      username,
      id,
      favouriteGenre
    }
  }
`

export const RECOMMEND_BOOKS = gql`
  query getRecommendedBooks($token: String) {
    recommendBook(token: $token) {
      title,
      genres,
      author {
        name,
        born,
        bookCount
      },
      published
    }
  }
`

export const UNIQUE_GENRES = gql`
  query {
    uniqueGenres
  }
`

// Mutations
export const NEW_BOOK = gql`
  mutation newBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name,
        born,
        bookCount
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $born: Int!
  ) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

// Subscriptions
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`