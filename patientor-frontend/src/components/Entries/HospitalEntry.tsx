import {HospitalEntry as HospitalEntryType} from "../../types";
import React from "react";

interface HospitalEntryProps {
    entry: HospitalEntryType;
}

const HospitalEntry:React.FC<{entry:HospitalEntryType}> = ({entry}:HospitalEntryProps) => {
    const diagnoseCodes = entry.diagnosisCodes ?? [];
    const diagnoseCodesEls = diagnoseCodes.map((code:string,i) => {
        return (<li key={i}>{code}</li>);
    });

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