import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  return (
    <p>
      <strong>{part.name} {part.exerciseCount}</strong><br/>
      {
        (() => {
          switch (part.kind) {
            case "background":
              return (
                <>
                  <em>{part.description}</em><br/>
                  <span>background material: <em>{part.backroundMaterial}</em></span>
                </>
              );
            case "basic":
              return <em>{part.description}</em>;
            case "group":
              return <span>project exercises {part.groupProjectCount}</span>;
            case "special":
              return (
                <>
                  <em>{part.description}</em><br/>
                  <span>requirements: {part.requirements.join(", ")}</span>
                </>
              );
          }
        })()
      }
    </p>
  );
};

export default Part;