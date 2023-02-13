import React from 'react'
import {ContentProps} from "../types";
import Part from "./Part";

const Content: React.FC<ContentProps> = ({courseParts}) => {
    const coursesEl = courseParts.map((coursePart, i) =>
        <Part key={i} coursePart={coursePart} />
    )

    return (
        <div>
            {coursesEl}
        </div>

    )
}

export default Content