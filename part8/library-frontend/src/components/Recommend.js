import { useQuery } from '@apollo/client'

import { USER, RECOMMEND_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const user = useQuery(USER)
  const recommendBook = useQuery(RECOMMEND_BOOKS)

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
          {recommendBook.data.recommendBook ? recommendBook.data.recommendBook.map((a) => (
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