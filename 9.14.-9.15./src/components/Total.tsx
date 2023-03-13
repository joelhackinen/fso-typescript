import { ContentProps } from "../types";

const Total = ({ parts }: ContentProps) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;