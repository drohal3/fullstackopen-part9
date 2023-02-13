import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealhcateEntry from "./OccupationalHealhcateEntry";
import {Entry as EntryType} from "../../types";
import React from "react";


/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => { // could go to separate file / helper
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

interface EntryProps {
    entry:EntryType;
}
const Entry:React.FC<{entry:EntryType}> = ({entry}:EntryProps) => {
    switch (entry.type) {
        case "HealthCheck":
            return (<HealthCheckEntry entry={entry} />);
        case "Hospital":
            return (<HospitalEntry entry={entry} />);
        case "OccupationalHealthcare":
            return (<OccupationalHealhcateEntry entry={entry}/>);
        default:
            return assertNever(entry);
    }
};

export default Entry;