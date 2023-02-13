import {HospitalEntry as HospitalEntryType} from "../../types";
import React from "react";
import Diagnoses from "./Diagnoses";

interface HospitalEntryProps {
    entry: HospitalEntryType;
}

const HospitalEntry:React.FC<{entry:HospitalEntryType}> = ({entry}:HospitalEntryProps) => {
    const diagnoseCodesEls = entry.diagnosisCodes ? <Diagnoses diagnoseCodes={entry.diagnosisCodes} /> : null;

    return (
        <div>
            <span>{entry.date}</span><br/>
            <span><i>{entry.description}</i></span><br/>
            <span>Discharge: {entry.discharge.date} {entry.discharge.criteria}</span>
            <ul>{diagnoseCodesEls}</ul>
            <span>diagnose by {entry.specialist}</span>
        </div>
    );
};

export default HospitalEntry;