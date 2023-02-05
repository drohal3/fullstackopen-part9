export interface HeaderProps {
    courseName: string
}

// export interface CoursePart {
//     name: string,
//     exerciseCount: number
// }

export interface  TotalProps {
    courseParts: Array<CoursePart>
}

// new types
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CourseDescribablePart extends CoursePartBase{
    description: string;
}

interface CourseNormalPart extends CourseDescribablePart {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescribablePart {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CourseDescribablePart {
    type: "special",
    requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


export interface ContentProps {
    courseParts: Array<CoursePart>
}

export interface CoursePartProps {
    coursePart:CoursePart
}
