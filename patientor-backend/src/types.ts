
export type Gender = "male" | "female";
export interface PatientEntry {
    id: number,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export interface DiagnoseEntry {
    code: string,
    name: string,
    latin?: string
}