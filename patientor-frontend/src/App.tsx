import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import {setDiagnoses, useStateValue} from "./state";
import {setPatientList} from "./state";
import { Patient, DiagnoseEntry } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";
import PatientPage from "./PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const { data: diagnosesFromApi } = await axios.get<DiagnoseEntry[]>(`${apiBaseUrl}/diagnoses`);
        console.log('patientListFromAPI - fetched', patientListFromApi);
        dispatch(setPatientList(patientListFromApi));
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/api/patient/:id" element={<PatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
