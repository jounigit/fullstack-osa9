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
import { Patient, Entry, EntryType } from "../types";
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
    const [entryType, setEntryType] = React.useState<string>("");

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
        console.log('=ENTRY values=', values);
        try {
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            
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

    const buttonActions = (entry: EntryType) => () => {
        setEntryType(entry);
        openModal();
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
              entryType={entryType}
            /> 
            <Button onClick={buttonActions(EntryType.HealthCheck)}>Add New HealthEntry</Button>
            <Button onClick={buttonActions(EntryType.Hospital)}>Add New HospitalEntry</Button>         
        </div>
    );
};

export default PatientPage;
