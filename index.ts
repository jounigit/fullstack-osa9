import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !weight) {
    res.status(400).json({ 
      error: 'content missing' 
    })
  }

  if ( isNaN(height) || isNaN(weight) ) {
    res.status(400).json({ 
      error: 'malformatted parameters' 
    })
  }

  const bmiValue = calculateBmi( height, weight );
  console.log( '= bmi == ', bmiValue );
  let resData = {
    weight: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: bmiValue
  }

  res.send(resData);
});


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})