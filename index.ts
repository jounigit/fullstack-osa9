import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isArray } from 'util';
const app = express();

app.use(express.json());


//*************** bmi ***********************/
app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) {
    res.status(400).json({ 
      error: 'content missing' 
    });
  }

  if ( isNaN(height) || isNaN(weight) ) {
    res.status(400).json({ 
      error: 'malformatted parameters' 
    });
  }

  const bmiValue = calculateBmi( height, weight );
  console.log( '= bmi == ', bmiValue );
  const resData = {
    weight: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: bmiValue
  };

  res.send(resData);
});

//*************** exercises ***********************/ 
app.post('/exercises', (req, res) => {
  const body = req.body;
  const arrValues = [body.target].concat(body.daily_exercises);
  console.log('= BODY =', arrValues);

  if (!body.daily_exercises || !body.target) {
    return res.status(400).json({ 
      error: 'content missing' 
    });
  }

  if ( isNaN(body.target) || !isArray(body.daily_exercises) ) {
    res.status(400).json({ 
      error: 'malformatted parameters' 
    });
  }

  const exerciseData = calculateExercises(arrValues);

  return res.json(exerciseData);
});

//*************** hello ***********************/ 
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});