import React from "react";
import {DiagnoseEntry} from "../../types";
import { useStateValue } from "../../state";


interface diagnosesProps {
    diagnoseCodes: Array<DiagnoseEntry['code']>;
}
const Diagnoses:React.FC<{diagnoseCodes:Array<DiagnoseEntry['code']>}> = ({diagnoseCodes}:diagnosesProps) => {
    const [{diagnoses}] = useStateValue();

    if (!diagnoses) {
        return null;
    }
    return (
        <ul>
            {diagnoseCodes.map((code, i) => {
                const diagnose = diagnoses.find((diagnose) => diagnose.code === code);
                return diagnose ? (<li key={i}>{code} {diagnose.name}</li>) : null;
            })}
        </ul>
    );
};

export default Diagnoses;