import React from 'react'
import {TotalProps, CoursePart} from "../types";

const Total: React.FC<TotalProps> = ({courseParts}) => {
    return (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry:number, part:CoursePart) => carry + part.exerciseCount, 0)}
        </p>
    )
}

export default Total;