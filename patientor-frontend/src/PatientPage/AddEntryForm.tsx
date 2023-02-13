import {Field, Formik, Form, FieldProps} from "formik";
import axios from "axios";
import {TextField} from "../AddPatientModal/FormField";
import {HealthCheckRating, Patient} from "../types";
import {Button, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import React from "react";
import {apiBaseUrl} from "../constants";
import { useStateValue, updatePatient } from "../state";

export type HealthCheckRatingOption = {
    value: HealthCheckRating;
    label: string;
};

type SelectFieldProps = {
    name: string;
    label: string;
    options: HealthCheckRatingOption[];
};

interface EntryFormValues {
    date: string,
    description: string,
    specialist: string,
    healthCheckRating: HealthCheckRating
}


const FormikSelect = ({field, ...props}: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({name, label, options}: SelectFieldProps) => (
    <>
        <InputLabel>{label}</InputLabel>
        <Field
            fullWidth
            style={{marginBottom: "0.5em"}}
            label={label}
            component={FormikSelect}
            name={name}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);

interface AddEntryFormProps {
    patientId: string
}

const AddEntryForm = ({patientId}: AddEntryFormProps) => {
    const [, dispatch] = useStateValue();

    const initialValues = {
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy
    };

    const fields = [
        {label: "Date", placeholder: "yyyy-mm-dd", name: "date", component: TextField},
        {label: "Description", placeholder: "description...", name: "description", component: TextField},
        {label: "Specialist", placeholder: "Name Surname", name: "specialist", component: TextField},
    ];

    const healthCheckOptions = Object.entries(HealthCheckRating).filter((entry) => typeof entry[1] !== 'string')
        .map((entry) => {
                return {value: Number(entry[1]), label: entry[0]};
            }
        );

    console.log('healthcheckOptions', healthCheckOptions);

    console.log(patientId);

    const submit = async (values:EntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patientId}/entries`,
                {...values, type:"HealthCheck"}
            );

            console.log("updatedPatient",updatedPatient);

            if (updatedPatient) {
                dispatch(updatePatient(updatedPatient));
            }


            console.log('updatedPatient', updatedPatient);

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={submit} enableReinitialize={true}>
            {({isValid, dirty}) => {
                return (

                    <Form className="form ui">
                        {fields.map((field, i) => (
                            <Field
                                key={i}
                                label={field.label}
                                placeholder={field.placeholder}
                                name={field.name}
                                component={field.component}
                            />
                        ))}
                        <SelectField name="healthCheckRating" label="Health Check Rating" options={healthCheckOptions}/>
                        <Grid>
                            <Grid item>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>

    );
};

export default AddEntryForm;