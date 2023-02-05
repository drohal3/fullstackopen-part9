import React from 'react'
import {CoursePartProps} from "../types";
const Part:React.FC<CoursePartProps> = ({coursePart}) => {
    const uniqueAttributes = []
    let description = null;

    /**
     * Helper function for exhaustive type checking
     */
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (coursePart.type) {
        case "normal":
            description = coursePart.description;
            break;
        case "submission":
            description = coursePart.description;
            uniqueAttributes.push({label: "Submit to", value: coursePart.exerciseSubmissionLink})
            break;
        case "groupProject":
            uniqueAttributes.push({label: "Project Exercises:", value: coursePart.groupProjectCount})
            break;
        case "special":
            description= coursePart.description;
            uniqueAttributes.push({label: "Required skills:", value: coursePart.requirements.join(', ')})
            break;
        default:
            return assertNever(coursePart);

    }

    const headingRow = (<strong>{coursePart.name} {coursePart.exerciseCount}</strong>);
    const descriptionRow = description ? (<><br/><i>{description}</i></>) : null;
    const uniqueRows = uniqueAttributes
        .map((attribute, i) => (<><br/><span key={i}>{attribute.label} {attribute.value}</span></>));

    return(
        <div>
            <p>
                {headingRow}
                {descriptionRow}
                {uniqueRows}
            </p>
        </div>
    )
}

export default Part;