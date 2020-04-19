import React, { Fragment } from "react";
import { Entry,
    OccupationalHealthcareEntry,
    HealthCheckEntry,
    HospitalEntry,
} from '../types';
// import { useStateValue } from "../state";
import { Segment, Header, Icon } from "semantic-ui-react";

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    // const healtColorList = {0:'green', 1: 'yellow', 2: 'orange', 3: 'red'};
    // const color = ;
    return (
        <Segment>
            <Header as='h3'>
                <Header.Content>
                    {entry.date} <Icon name='hospital' />
                    <Header.Subheader>{entry.description}</Header.Subheader>
                </Header.Content>
            </Header>
            <Header as='h4'>
                <Header.Content>
                Discharge
                </Header.Content>
                <Header.Subheader>{entry.discharge?.date} {entry.discharge?.criteria}</Header.Subheader>
            </Header>
        </Segment>
    );
};

const getColor = (rateNumber: number) => {
    return rateNumber === 0 ? "green" : 
    rateNumber === 1 ? "yellow" : rateNumber === 2 ? "orange" : "red";
};

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    return (
        <Segment>
            <Header as='h3'>
                <Header.Content>
                    {entry.date} <Icon name='user md' />
                    <Header.Subheader>{entry.description}</Header.Subheader>
                    <Icon name='heart' color={getColor(entry.healthCheckRating)} /> 
                </Header.Content>
            </Header>
        </Segment>
    );
};

const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
    return (
        <Segment>
            <Header as='h3'>
                <Header.Content>
                    {entry.date} <Icon name='stethoscope' /> {entry.employerName}                    
                    <Header.Subheader>{entry.description}</Header.Subheader>
                </Header.Content>
            </Header>
        </Segment>
    );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "Hospital":            
            return <Hospital entry={entry} />;   
        case "OccupationalHealthcare":           
            return <OccupationalHealthcare entry={entry} />;
    }
};

export const Entries = ({entries}: {entries: Entry[]}) => {
    return (
        <Fragment>
            {
                entries.map(( val, index ) => {
                    return (
                        <div key={index}>
                            <EntryDetails entry={ val } />
                        </div>
                    );
                })
            }
        </Fragment>
    );
};