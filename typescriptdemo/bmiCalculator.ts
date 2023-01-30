
interface CalculateBmiValues {
    height: number,
    weight: number
}
const parseArguments = (args: Array<string>): CalculateBmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

export const calculateBmi = (height: number, weight: number) => {
    const bmi = ((weight) / ((height/100) ** 2))

    let bmiDesc: string = "";

    switch (true) {
        case (bmi < 16.0):
            bmiDesc = `Underweight (Severe thinness)`;
            break;
        case (bmi < 17.0) :
            bmiDesc = `Underweight (Moderate thinness)`;
            break;
        case (bmi < 18.5):
            bmiDesc = `Underweight (Mild thinness)`;
            break;
        case (bmi < 25.0):
            bmiDesc = `Normal range`;
            break;
        case (bmi < 30.0):
            bmiDesc = `Overweight (Pre-obese)`;
            break;
        case (bmi < 35.0):
            bmiDesc = `Obese (Class I)`;
            break;
        case (bmi < 40):
            bmiDesc = `Obese (Class II)`;
            break;
        default:
            bmiDesc = `Obese (Class III)`;
            break;
    }

    return {
        bmi: bmi,
        bmiDesc,
        height,
        weight
    };
}

try {
    const {height, weight} = parseArguments(process.argv);
    const bmiStat = calculateBmi(height, weight);

    console.log(bmiStat.bmiDesc)

} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}