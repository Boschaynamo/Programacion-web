import React from 'react'

const Courses = ({ courses }) => {
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

export default Courses