import {useParams} from 'react-router-dom';
import { useStateValue, setPatient } from "../state";


import axios from "axios";


import React from "react";
import {apiBaseUrl} from "../constants";
import {Patient} from "../types";
import Entries from "../components/Entries/Entries";
import AddEntryForm from "./AddEntryForm";

const PatientPage = () => {
    const {id} = useParams<{id:string}>();
    const [{currentPatient}, dispatch] = useStateValue();

    if (!id) {
        throw new Error("Patient id is not defined.");
    }

    const fetchPatient = async () => {
        try {
            const fetched= await axios.get(`${apiBaseUrl}/patients/${id}`);
            const fetchedPatient:Patient = fetched.data as Patient;
            console.log('fetched patient', fetchedPatient);
            dispatch(setPatient(fetchedPatient));
        } catch (e) {
            console.log(e.message);
        }

    };
    if (!currentPatient || currentPatient.id !== id) {
        void fetchPatient();
    } else {
        console.log('patient loaded from state', currentPatient);
    }

    console.log(id);
    return currentPatient ? (
        <div>
            <h2>{currentPatient.name} ({currentPatient.gender})</h2>
            <span>ssh: {currentPatient.ssn}</span><br/>
            <span>occupation: {currentPatient.occupation}</span>
            <h3>Entries</h3>
            <AddEntryForm patientId={currentPatient.id} />
            <br/>
            <br/>
            <Entries entries={currentPatient.entries} />
        </div>
    ) : (<span>Loading...</span>);
};

export default PatientPage;