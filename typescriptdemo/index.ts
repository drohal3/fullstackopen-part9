import express from 'express';
import {calculateBmi} from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = req.query.weight;
    const height = req.query.height;

    if (isNaN(Number(weight)) || isNaN(Number(height))) {
        res.send({error: "malformatted parameters"});
    }

    const bmiStat = calculateBmi(Number(height), Number(weight));
    res.send({weight, height, bmi: bmiStat.bmiDesc});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});