import {Discharge, Gender, HealthCheckRating, NewEntry, NewPatientEntry, SickLeave} from "./types";

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }

    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn')
    }

    return ssn;
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('incorrect or missing occupation')
    }

    return occupation;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);    }

    return gender;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
    };

    return newEntry;
}

const parseDescription = (description:unknown):string => {
    if (!description || !isString(description)) {
        throw new Error('incorrect or missing description');
    }

    return description;
}

const parseSpecialist = (specialist:unknown):string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('incorrect or missing specialist');
    }

    return specialist;
}

const parseDiagnosisCodes = (diagnosisCodes:unknown):string[] => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
        throw new Error('diagnosesCodes is expected to be an array');
    }

    diagnosisCodes.map((code:any) => {
        if (!code || !isString(code)) {
            throw new Error('diagnoseCodes is expected to be and array of strings');
        }
    })

    return diagnosisCodes;
}

const parseType = (type:unknown):string => {
    if (!type || !isString(type)) {
        throw new Error('incorrect or missing type');
    }

    return type;
}

const parseHealthCheckRating = (healthcheckRating:unknown):HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isHealthCheckRating = (param: any): param is HealthCheckRating => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return Object.values(HealthCheckRating).includes(param);
    };

    // healthcheckRating can be 0, !healthcheckRating in the condition results in unwanted behavior
    if (healthcheckRating == null || !isHealthCheckRating(healthcheckRating)) {
        throw new Error(`incorrect or missing healthcheckRating`);
    }

    return healthcheckRating;
}

const parseCriteria = (criteria:unknown):string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('invalid or missing criteria');
    }

    return criteria;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toDischargeEntry = (object: any): Discharge => {
    return {
        date: parseDate(object.date),
        criteria: parseCriteria(object.criteria)
    };
}

const parseEmployerName = (employerName:unknown):string => {
    if (!employerName || !isString(employerName)) {
        throw new Error('invalid or missing employerName');
    }

    return employerName;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toSickLeaveEntry = (object: any): SickLeave => {
    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate) // in the future, endDate > startDate
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntryEntry = (object: any): NewEntry => {
    let newEntry: any = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        type: parseType(object.type)
    };

    if (object.diagnosisCodes) {
        newEntry = {...newEntry, diagnosisCodes:parseDiagnosisCodes(object.diagnosisCodes)}
    }

    switch (object.type) {
        case "HealthCheck":
            return {...newEntry, healthCheckRating: parseHealthCheckRating(object.healthCheckRating) };
        case "Hospital":
            return {...newEntry, discharge: toDischargeEntry(object.discharge)};
        case "OccupationalHealthcare":
            if (object.sickLeave) {
                newEntry = {...newEntry, sickLeave: toSickLeaveEntry(object.sickLeave)};
            }
            return {...newEntry, employerName: parseEmployerName(object.employerName)};
        default:
            throw new Error("invalid entry type");
    }
}