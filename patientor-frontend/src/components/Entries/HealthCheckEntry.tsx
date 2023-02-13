import {HealthCheckEntry as HealthCheckEntryType} from "../../types";
import React from "react";
import Diagnoses from "./Diagnoses";

interface HealthCheckEntryProps {
    entry: HealthCheckEntryType;
}

const HealthCheckEntry:React.FC<{entry:HealthCheckEntryType}> = ({entry}:HealthCheckEntryProps) => {
    const diagnoseCodesEls = entry.diagnosisCodes ? <Diagnoses diagnoseCodes={entry.diagnosisCodes} /> : null;

    return (
        <div>
            <span>{entry.date}</span><br/>
            <span><i>{entry.description}</i></span><br/>
            <span>Healthcheck rating: {entry.healthCheckRating}</span><br/>
            <ul>{diagnoseCodesEls}</ul>
            <span>diagnose by {entry.specialist}</span>
        </div>
    );
};

export default HealthCheckEntry;