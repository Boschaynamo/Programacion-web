import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = (props) => {
  return (
    props.text + ' ' + props.value
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const positive = props.good * 100 / all
  if (all === 0) {
    return (<div>No feedback has been given</div>)
  }
  else {
    return (
      <div>
        <StatisticLine text='good' value={props.good} /><br></br>
        <StatisticLine text='neutral' value={props.neutral} /><br></br>
        <StatisticLine text='bad' value={props.bad} /><br></br>
        <StatisticLine text='all' value={all} /><br></br>
        <StatisticLine text='average' value={average} /><br></br>
        <StatisticLine text='positive' value={positive} /> %<br></br>
      </div>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
