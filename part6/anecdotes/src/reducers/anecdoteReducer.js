import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
import { setNotification } from "./notificationReducer"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    upvoteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { upvoteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    console.log(anecdote)
    dispatch(setAnecdotes(anecdote))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(setNotification(`new anecdote ${content}`, 10))
  }
}

export const updateAnecdote = content => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.updateAnecdote(content)
    dispatch(upvoteAnecdote(updateAnecdote))
    dispatch(setNotification(`you voted "${content.content}"`, 10))
  }
}

export default anecdoteSlice.reducer