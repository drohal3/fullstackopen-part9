import {HealthCheckEntry as HealthCheckEntryType} from "../../types";
import React from "react";

interface HealthCheckEntryProps {
    entry: HealthCheckEntryType;
}

const HealthCheckEntry:React.FC<{entry:HealthCheckEntryType}> = ({entry}:HealthCheckEntryProps) => {
    const diagnoseCodes = entry.diagnosisCodes ?? [];
    const diagnoseCodesEls = diagnoseCodes.map((code:string,i) => {
        return (<li key={i}>{code}</li>);
    });

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