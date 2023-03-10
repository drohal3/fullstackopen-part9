import { State } from "./state";
import {DiagnoseEntry, Patient} from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSES";
      payload: DiagnoseEntry[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        currentPatient: action.payload
      };
    case "UPDATE_PATIENT":
      console.log('state',state);
      console.log('curr patient new', state.currentPatient ? state.patients[state.currentPatient.id] : "not defined");
      console.log('curr patient', state.currentPatient ? state.currentPatient : "not defined");

      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        },
        currentPatient: state.currentPatient && state.currentPatient.id === action.payload.id
            ? action.payload
            : state.currentPatient
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};

// action creator functions

export const setPatientList = (patientListFromApi:Patient[]):Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

export const addPatient = (patient:Patient):Action => {
  return { type: "ADD_PATIENT", payload: patient};
};

export const updatePatient = (patient:Patient):Action => {
  return { type: "UPDATE_PATIENT", payload: patient };
};

export const setPatient = (patient:Patient):Action => {
  return { type: "SET_PATIENT", payload: patient };
};

export const setDiagnoses = (diagnoses:DiagnoseEntry[]):Action => {
  return { type: "SET_DIAGNOSES", payload: diagnoses };
};
