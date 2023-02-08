import {OccupationalHealthcareEntry as OccupationalHealthcareEntryType} from "../../types";
import React from "react";
import Diagnoses from "./Diagnoses";

interface OccupationalHealthcareEntryProps {
    entry: OccupationalHealthcareEntryType;
}

const OccupationalHealthcareEntry:React.FC<{entry:OccupationalHealthcareEntryType}> = ({entry}:OccupationalHealthcareEntryProps) => {

    const diagnoseCodesEls = entry.diagnosisCodes ? <Diagnoses diagnoseCodes={entry.diagnosisCodes} /> : null;

    const sickleaveEl = entry.sickLeave
        ? (<><span>Sickleave: {entry.sickLeave.endDate} - {entry.sickLeave.endDate}</span><br/></>)
        : null;

    return (
        <div>
            <span>{entry.date}</span><br/>
            <span><i>{entry.description}</i></span><br/>
            <span>Employer: {entry.employerName}</span><br/>
            {sickleaveEl}
            <ul>{diagnoseCodesEls}</ul>
            <span>diagnose by {entry.specialist}</span>
        </div>
    );
};

export default OccupationalHealthcareEntry;