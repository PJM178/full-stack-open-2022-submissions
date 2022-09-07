import { useState } from 'react'

const Display = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.buttonClick}>
      {props.text}
    </button>
  )
}

const Stat = (props) => {
  return (
    <div>has {props.votes} votes</div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [pointCounter, setpointCounter] = useState(new Uint8Array(anecdotes.length))
  const points_copy = [...pointCounter]

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
    }

  const incrementVotes = () => {
    points_copy[selected] += 1
    setpointCounter(points_copy)
  }

  const max = Math.max(...points_copy)

  return (
    <div>
      <Display text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <Stat votes={points_copy[selected]} />
      <div>
        <Button buttonClick={() => incrementVotes()} text="Vote" />
        <Button buttonClick={() => randomAnecdote()} text="Next Anecdote" />
      </div>
      <Display text="Anecdote with most votes" />
      <div>{anecdotes[points_copy.indexOf(max)]}</div>
      <Stat votes={max} />
    </div>
  )
}

export default App
