interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CoursePartReq extends CoursePartDesc {
  requirements: string[];
  kind: "special";
}

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackround extends CoursePartDesc {
  backroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackround | CoursePartReq;

export interface ContentProps {
  parts: CoursePart[];
}
