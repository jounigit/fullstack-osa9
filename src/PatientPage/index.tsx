/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios from "axios";
import { Header, Container, Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, 
    updatePatient, 
    addEntry 
} from "../state";
import { Patient, Entry } from "../types";
import { Entries } from "../components/Entries";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    let patientToShow = patients[id];

    //*************** modal stuff ********************/
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };

    //*************** fetch from api ********************/
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

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            console.log('=ENTRY NEWW=', newEntry);
            dispatch(addEntry(newEntry, id));
            closeModal();
        }  catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
          }
    };

    //*************************************************************/
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const hasVisited = (param: Patient): boolean => param.visited!;

    patientToShow && !hasVisited(patientToShow) && fetchPatient();
    
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
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            /> 
            <Button onClick={() => openModal()}>Add New Entry</Button>         
        </div>
    );
};

export default PatientPage;
