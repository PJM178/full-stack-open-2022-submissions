// import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
// import { setNotification } from "../reducers/notificationReducer"
import { connect } from 'react-redux'

const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    // dispatch(setNotification(`you voted "${content}"`, 10))
    // props.setNotification(`you voted "${content}"`, 10)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default connect(
  null,
  { createAnecdote },
  // { setNotification }
)(NewAnecdote)
// export default NewAnecdote