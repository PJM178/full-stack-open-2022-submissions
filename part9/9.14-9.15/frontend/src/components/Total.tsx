// Types for items in objects
interface ContentProps {
  name: string;
  exerciseCount: number;
}

// Type for objects in array
interface CourseParts {
  parts: ContentProps[]
}

const Total = (props: CourseParts) => {
//         Number of exercises{" "}
//         {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  return (
    <div>
      <p>
      Number of exercises {`"`}{props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}{`"`}
      </p>
    </div>
  );
};

export default Total;