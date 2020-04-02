
interface ExerciseInfo {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

// const parseArgs = (args: Array<string>) => {
//     args.forEach( arg => {
//         if (isNaN(Number(arg))) {
//             throw new Error('Provided values were not numbers!');
//         }
//     });
//     return args.map( a => Number(a) );
// };

export const calculateExercises = (args: Array<number>): ExerciseInfo => {
    const trainingData = args.slice(1);
    const periodLength: number = trainingData.length;
    const sum: number = trainingData.reduce((x, y) => x + y);
    const targetHours: number = periodLength * args[0];
    const average: number = sum / periodLength;
    const rating: number = sum >= targetHours ? 3 : sum >= (targetHours/2) ? 2 : 1;

    return {
        periodLength: periodLength,
        trainingDays: trainingData.filter( a => a !== 0 ).length,
        success: sum === targetHours,
        rating: rating,
        ratingDescription: rating === 3 ? 'excellent job!!!' : rating === 2 ? 'not too bad but could be better' : 'lousy job',
        target: args[0],
        average: average
    };
};

// try {
//     const argsNumber = parseArgs( process.argv.slice(2) );
//     console.log(calculateExercises(argsNumber));
//   } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
//   }
