/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios from "axios";
import { Header, Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";
import { Entries } from "../components/Entries";

const PatientPage: React.FC = () => {
    const [state, dispatch] = useStateValue();

    const { id } = useParams<{ id: string }>();
    let patientToShow = state.patients[id];

    const fetchPatient = async () => {
        try {
            const { data: patient } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
        patientToShow = patient;
        dispatch(updatePatient(patient));
        } catch (e) {
            console.error(e);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hasVisited = (param: Patient): boolean => param.visited!;

    patientToShow && !hasVisited(patientToShow) && fetchPatient();

    // console.log('=Patient=', patientToShow);
    
    const showPatient = (param: Patient) => {
        const icon =   param.gender === 'male' ? 'mars' : 
        param?.gender === 'female' ? 'venus' : 'transgender';
        // console.log('=Show param=', param.entries);
        const showEntries = param.entries && <Entries entries={param.entries} />;
        return (
            <Container>
                <Header as='h2'>
                {param.name} 
                <Icon name={icon} />
                </Header>
                <p style={{ marginBottom: 5 }}>ssn: {param.ssn}</p>
                <p>occupation: {param.occupation}</p>
                <Header as='h3' content='entries' />
                { showEntries }
            </Container>
        );
    };

    return (
        <div className="App"> 
            {
                patientToShow && showPatient(patientToShow)
            }            
        </div>
    );
};

export default PatientPage;
