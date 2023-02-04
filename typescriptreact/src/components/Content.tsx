import React from 'react'
import {ContentProps} from "../types";

const Content: React.FC<ContentProps> = ({courseParts}) => {
    const coursesEl = courseParts.map((coursePart, i) =>
        <p key={i}>{coursePart.name} {coursePart.exerciseCount}</p>
    )

    return (
        <div>
            {coursesEl}
        </div>

    )
}

export default Content