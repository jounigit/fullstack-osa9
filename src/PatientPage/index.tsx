/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios from "axios";
import { Header, Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";

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

    // const hasVisited = (param: Patient|Required<Pick<Patient, 'visited'>>): param is Required<Patient> =>
    // typeof param.visited === 'boolean';

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hasVisited = (param: Patient): boolean => param.visited!;

    patientToShow && !hasVisited(patientToShow) && fetchPatient();

    // try {
    //     console.log('=TRY==');
    //     !hasVisited(patientToShow) && fetchPatient();
    // } catch (e) {
    //     console.log('=CATCH==');
    // }

    // const hasVisited = (param: Patient): 
    // param is Patient & Required<Pick<Patient, 'visited'>> => !!param.visited;

    // if ( !Object.prototype.hasOwnProperty.call(patientToShow, 'visited') ) {
    //     fetchPatient();
    // }

    console.log('=Patient=', patientToShow);
    
    const showPatient = (param: Patient) => {
        const icon =   param.gender === 'male' ? 'mars' : 
        param?.gender === 'female' ? 'venus' : 'transgender';
        return (
            <Container>
                <Header as='h2'>
                {param.name} 
                <Icon name={icon} />
                </Header>
                <p style={{ marginBottom: 5 }}>ssn: {param.ssn}</p>
                <p>occupation: {param.occupation}</p>
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
