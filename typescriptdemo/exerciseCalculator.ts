type Rating = 1 | 2 | 3;

interface ExerciseValues {
    target: number,
    dailyHours: Array<number>
}
interface ExerciseStats {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    ratingDescription: string,
    target: number,
    average: number
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');


    const dailyHoursArg = args.slice(3);
    let dailyHours: Array<number> = [];

    dailyHoursArg.forEach((hour) => {
        if (isNaN(Number(hour))) {
            throw new Error(`"${hour}" in the array is not a number.`);
        } else {
            dailyHours = [...dailyHours, Number(hour)];
        }
    });

    if (!isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            dailyHours
        };
    } else {
        throw new Error('Provided values are of invalid types!');
    }
};

export const calculateExercises = (dailyHours: Array<number>, target: number): ExerciseStats => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.reduce((count, val) => val > 0 ? count + 1 : count , 0);
    const trainedHours = dailyHours.reduce((sum,val) => sum + val, 0);
    const average = periodLength > 0 ? trainedHours/periodLength : 0;

    const rating = (average < target)
        ? 1
        : (average < (target * 1.25))
            ? 2
            : 3;
    let ratingDescription = "";
    switch (rating) {
        case 1:
            ratingDescription = "Missed your target - you can do better.";
            break;
        case 2:
            ratingDescription = "Great, you hit your target!";
            break;
        case 3:
            ratingDescription = "Amazing, it is time to increase your target! You did much better than aimed.";
            break;
    }


    return { periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average };
};

try {
    const {dailyHours, target} = parseExerciseArguments(process.argv);
    const stats = calculateExercises(dailyHours, target);
    // console.log(target)
    // console.log(dailyHours)
    console.log(stats);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }

    console.log(errorMessage);
}
