import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorBirth = (props) => {
  const [name, setName] = useState(props.authors[0].name)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    await editAuthor({ variables: { name, born } })
    
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <table>
          <tbody>
            {/* <tr>
              <td>Name:</td><td><input value={name} onChange={({ target }) => setName(target.value)}/></td>
            </tr> */}
            <tr>
              <td>Name:</td>
              <td>
                <select onChange={({ target }) => setName(target.value)}>
                  {props.authors.map((author, i) => (
                    <option key={i} value={author.name}>{author.name}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>Born:</td><td><input type="number" value={born} onChange={({ target }) => setBorn((Number(target.value)))}/></td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirth