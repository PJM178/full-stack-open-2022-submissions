import { useDispatch, useSelector } from "react-redux"
import { updateAnecdote } from '../reducers/anecdoteReducer'
// import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {
  const anecdotes = [...useSelector(state => state.anecdotes)]
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  anecdotes.sort((a, b) => a.votes - b.votes)
  anecdotes.reverse()
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const actionCreator = (payload) => {
    dispatch(updateAnecdote(payload))
    // dispatch(setNotification(`you voted "${payload.content}"`, 10))
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => actionCreator(anecdote)}>vote</button>
        </div>
      </div>
      )}
    </div>
  )

}

export default AnecdoteList