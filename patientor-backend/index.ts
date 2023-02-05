import express from 'express';
import cors from 'cors' // needed to relax API security requirements

import {getNonSensitiveEntries as getPatientEntries, addEntry as addPatient, getEntry as getPatient} from "./src/services/patientService";
import {getEntries as getDiagnoseEntries} from "./src/services/diagnoseService";
import {toNewPatientEntry} from "./src/utils";

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/patients', (_req, res) => {
    // console.log('someone pinged here');
    res.send(getPatientEntries());
});

app.get('/api/patients/:id', (req, res) => {
    const id = req.params.id;

    try {
        const patient = getPatient(id);
        res.send(patient);
    } catch (e:any) {
        res.status(404).send(e.message);
    }
})

app.post('/api/patients', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatientEntry = addPatient(newPatientEntry);

        res.json(addedPatientEntry);
    } catch (e:any) {
        res.status(400).send(e.message);
    }
})

app.get('/api/diagnoses', (_req, res) => {
    // console.log('someone pinged here');
    res.send(getDiagnoseEntries());
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});