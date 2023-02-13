import express from 'express';
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";
import morganMiddleware from "./utils/morganMiddleware"; // winston + morgan instructions: https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342
import cors from 'cors' // needed to relax API security requirements

const app = express();

app.use(cors())
app.use(express.json())
app.use(morganMiddleware)

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

app.post('/exercises', (req,res, _next) => {
    const body = req.body

    const dailyExercises = body.daily_exercises;
    const target = Number(body.target);

    if (dailyExercises === undefined || target === undefined) {
        return res.status(400).json({error: "parameters missing"}).send();
    }

    if (isNaN(target)) {
        return res.status(400).json({error: "malformatted parameters"}).send();
    }

    if (!Array.isArray(dailyExercises)) {
        return res.status(400).json({error: "malformatted parameters"}).send();
    }

    let typeFlg = false;

    dailyExercises.forEach((el) => {
        if (isNaN(Number(el))) {
            typeFlg = true;
        }
    })

    if (typeFlg) {
        return res.status(400).json({error: "malformatted parameters"}).send();
    }

    // mapped daily exercises to assure that i.e. "2" => 2
    const stats = calculateExercises(dailyExercises.map((num) => Number(num)), target);

    return res.send(stats);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});