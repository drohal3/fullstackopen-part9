import patientData from '../../data/patients.json'
import {PatientEntry, NonSensitivePatientEntry} from '../types'

// @ts-ignore
const patients: Array<PatientEntry> = patientData as Array<PatientEntry>
export const getEntries = () => {
    return patients;
}

export const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => { // alternative syntax NonSensitivePatientEntry[] for Array
    return patients
        .map((
                {id, name, dateOfBirth, gender, occupation}
            ) => ({id, name, dateOfBirth, gender, occupation})
        ); // filtering out ssn attribute {id, name, ssn, dateOfBirth, gender, occupation}
}

