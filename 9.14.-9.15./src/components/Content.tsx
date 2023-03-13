import Part from "./Part";
import { ContentProps } from "../types";

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  );
};

export default Content;