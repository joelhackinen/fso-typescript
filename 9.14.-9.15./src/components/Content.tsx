interface ICourse {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  parts: ICourse[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map(({ name, exerciseCount }, i) => (
        <p key={i}>{name} {exerciseCount}</p>
      ))}
    </>
  );
};

export default Content;