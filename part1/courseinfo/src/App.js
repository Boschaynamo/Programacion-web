const Header = (props) => {
  //console.log(props)
  return <h1>{props.course}</h1>
}
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}
const Content = (props) => {
  return (
    <>
      <Part part={props.arrayparts[0].name} exercises={props.arrayparts[0].exercises} />
      <Part part={props.arrayparts[1].name} exercises={props.arrayparts[1].exercises} />
      <Part part={props.arrayparts[2].name} exercises={props.arrayparts[2].exercises} />
    </>
  )
}
const Total = (props) => {
  return (
    <p> Number of exercises {props.arrayparts[0].exercises}+{props.arrayparts[1].exercises}+{props.arrayparts[2].exercises}</p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content arrayparts={course.parts} />
      <Total arrayparts={course.parts} />
    </div >
  )
}

export default App