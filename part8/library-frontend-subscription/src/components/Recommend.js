import { useQuery } from '@apollo/client'

import { USER, RECOMMEND_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const userData = useQuery(USER, {
    variables: { token: localStorage.getItem('library-user-token') ? localStorage.getItem('library-user-token') : null }
    })
  const recommendBooks = useQuery(RECOMMEND_BOOKS, {
    variables: { token: localStorage.getItem('library-user-token') ? localStorage.getItem('library-user-token') : null }
  })

  console.log(recommendBooks)

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <div style={{ fontWeight: 'bold', display: 'inline-block' }}>{userData.data ? userData.data.me.favouriteGenre : null}</div></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendBooks.data ? recommendBooks.data.recommendBook.map((a, i) => (
            <tr key={i}>
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