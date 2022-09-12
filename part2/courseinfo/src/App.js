function Courses({ courses }) {
  return (
    <div>
      {courses.map(course =>
        <div key={course.id}>
          <h1>{course.name}</h1>
          {course.parts.map(part =>
            <p key={part.id} >{part.name} {part.exercises}</p>
          )}
          <h4>
            Total of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
          </h4>
        </div>
      )}

      
    </div>
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        },
        {
          name: 'More',
          exercises: 10,
          id: 5
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App