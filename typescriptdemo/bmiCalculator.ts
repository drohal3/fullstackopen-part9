
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

const calculateBmi = (height: number, weight: number) => {
    return ((weight) / ((height/100) ** 2));
}

try {
    const {height, weight} = parseArguments(process.argv);
    const bmi = calculateBmi(height, weight);

    switch (true) {
        case (bmi < 16.0):
            console.log(`Underweight (Severe thinness)`);
            break;
        case (bmi < 17.0) :
            console.log(`Underweight (Moderate thinness)`);
            break;
        case (bmi < 18.5):
            console.log(`Underweight (Mild thinness)`);
            break;
        case (bmi < 25.0):
            console.log(`Normal range`);
            break;
        case (bmi < 30.0):
            console.log(`Overweight (Pre-obese)`);
            break;
        case (bmi < 35.0):
            console.log(`Obese (Class I)`);
            break;
        case (bmi < 40):
            console.log(`Obese (Class II)`);
            break;
        default:
            console.log(`Obese (Class III)`);
            break;
    }

    // console.log(bmi)

} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}