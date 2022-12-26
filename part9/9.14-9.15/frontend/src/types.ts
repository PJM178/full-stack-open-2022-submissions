  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface Description extends CoursePartBase{
    description: string;
  }

  interface CourseNormalPart extends Description {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends Description {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialtype extends Description {
    type: "special";
    requirements: string[];
  }

  export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialtype;