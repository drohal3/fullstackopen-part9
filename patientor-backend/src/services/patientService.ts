import { v1 as uuid } from 'uuid'
import patientData from '../../data/patients.json'
import {PatientEntry, NonSensitivePatientEntry, NewPatientEntry} from '../types'

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

export const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const id = uuid()
    const newPatient = {
        id,
        ...entry
    };

    patients.push(newPatient)

    return newPatient;
}

export const getEntry = (id: string): PatientEntry => {
    const patient = patients.find((patient) => patient.id === id);

    if (!patient) {
        throw new Error(`Patient with id ${id} not found.`);
    }

    return patient
}

