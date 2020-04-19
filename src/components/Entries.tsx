import React, { Fragment } from "react";
import { Entry } from '../types';
import { useStateValue } from "../state";

const EntryContent = ({entry}: {entry: Entry}) => {
    const [{ diagnosis }, ] = useStateValue();
    return (
        <>
        <p> {entry.date} {entry.description} </p>
        <ul>
            {
                entry.diagnosisCodes?.map(( code, i ) => 
            <li key={i}>{code} {diagnosis[code].name}</li>
                )
            }                    
        </ul>
        </>
    );
};

const ShowEntry = ({entry}: {entry: Entry}) => {
    switch (entry.type) {
        case "HealthCheck":
            return <EntryContent entry={entry} />;
        case "Hospital":            
            return <EntryContent entry={entry} />;   
        case "OccupationalHealthcare":           
            return <EntryContent entry={entry} />;
    }
};

export const Entries = ({entries}: {entries: Entry[]}) => {
    return (
        <Fragment>
            {
                entries.map(( val, index ) => {
                    return (
                        <div key={index}>
                            <ShowEntry entry={ val } />
                        </div>
                    );
                })
            }
        </Fragment>
    );
};