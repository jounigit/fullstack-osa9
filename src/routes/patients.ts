import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(String(req.params.id));
    
    console.log('= Router =', patient);
    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
});

  router.post('/:id/entries', (req, res) => {
    try {
      // const newEntry = toNewEntry(req.body);
      const newEntry = toNewEntry(req.body);

      const addedEntry = patientService.addEntry(String(req.params.id), newEntry);
      res.json(addedEntry);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

  router.post('/', (req, res) => {
    try {
      const newPatient = toNewPatient(req.body);
        
      const addedPatient = patientService.addPatient(newPatient);
      res.json(addedPatient);
    } catch (e) {
      res.status(400).send(e.message); 
    }
  });

export default router;