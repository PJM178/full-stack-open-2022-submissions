import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'

import AuthorBirth from './AuthorBirth'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  console.log(authors)

  if (!props.show) {
    return null
  }

  // const authors = []

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? <AuthorBirth authors={authors.data.allAuthors} /> : null}
    </div>
  )
}

export default Authors
