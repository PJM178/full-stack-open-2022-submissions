import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  switch (part.type) {
    case "normal":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case "groupProject":
      return (
        <div>
          Project exercises {part.groupProjectCount}
        </div>
      );
    case "submission":
      return (
        <div>
          <i>{part.description}</i>
          <div>Submit to <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></div>
        </div>
      );
    case "special":
      console.log(part.requirements);
      return (
        <div>
          <i>{part.description}</i>
          <div>Required skills: {part.requirements.join(', ')}</div>
        </div>
      );
    default:
      return assertNever(part);
  }
  // parts.forEach(part => {
  //   console.log(part);
  //   switch (part.type) {
  //     case "normal":
  //       console.log("normal");
  //       return (
  //         <div>
  //           <p>{part.description}</p>
  //         </div>
  //       );
  //     case "groupProject":
  //       console.log("groupProject");
  //       return (
  //         <div>
  //           jorma
  //         </div>
  //       );
  //     case "submission":
  //       return (
  //         <div>
  //           jorma
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div>
  //           jorma
  //         </div>
  //       );
  //   }
  // });
};

export default Part;