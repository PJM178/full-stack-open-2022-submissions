import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part, i) => (
        <div key={i}>
            <strong>{part.name} {part.exerciseCount} </strong>
            <Part part={part} />
            <p></p>
        </div>
      ))}
    </div>
  );
};

export default Content;