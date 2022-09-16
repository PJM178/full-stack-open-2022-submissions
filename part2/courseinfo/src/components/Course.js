const Course = ({ course }) => {
    return (
      <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total sum={course.parts} />
      </div>
    )
  }
  
  const Header = ({ course }) => <h1>{course}</h1>
  
  const Total = ({ sum }) => {
    const exerciseSum = sum.reduce((sum, exercise) => sum + exercise.exercises, 0)
    return (
      <p>Total of {exerciseSum} exercises</p>
    )
  }
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => {
    return (
      <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
      </>
    )
  }

export { Course, Header }