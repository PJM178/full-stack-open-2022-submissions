import { useState } from 'react'

const Display = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Statistics = ({statistics}) => {
  if (statistics.all.stat !== 0) {
    return (
      <table>
        <tbody>
          <tr><StatisticLine text={statistics.good.name} value={statistics.good.stat}/></tr>
          <tr><StatisticLine text={statistics.bad.name} value={statistics.bad.stat}/></tr>
          <tr><StatisticLine text={statistics.neutral.name} value={statistics.neutral.stat}/></tr>
          <tr><StatisticLine text={statistics.all.name} value={statistics.all.stat}/></tr>
          <tr><StatisticLine text={statistics.average.name} value={statistics.average.stat}/></tr>
          <tr><StatisticLine text={statistics.positive.name} value={statistics.positive.stat+" %"}/></tr>
        </tbody>
      </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
    <td>{text}</td><td>{value}</td>
    </>
  )
}

const Button = (props) => (
  <button onClick={props.feedbackClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const title = "give feedback"
  const stats = "statistics"

  const statistics = {
    good: {
      name: "good",
      stat: good
    },
    neutral: {
      name: "neutral",
      stat: neutral
    },
    bad: {
      name: "bad",
      stat: bad
    },
    all: {
      name: "all",
      stat: all
    },
    average: {
      name: "average",
      stat: average/all
    },
    positive: {
      name: "positive",
      stat: good/all*100
    }
  }
  

  const feedbackGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }

  const feedbackNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage(average)
  }

  const feedbackBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <Display title={title} />
      <Button feedbackClick={() => feedbackGood()} text="good" />
      <Button feedbackClick={() => feedbackNeutral()} text="neutral" />
      <Button feedbackClick={() => feedbackBad()} text="bad" />
      <Display title={stats} />
      <Statistics statistics={statistics} />
    </div>
  )
}

export default App