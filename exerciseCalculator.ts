interface ExerciseInfo {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (args: Array<number>, targetPerDay: number): ExerciseInfo => {
    const periodLength: number = args.length
    const sum: number = args.reduce((x, y) => x + y)
    const targetHours: number = periodLength * targetPerDay
    const average: number = sum / periodLength
    const rating: number = sum >= targetHours ? 3 : sum >= (targetHours/2) ? 2 : 1

    return {
        periodLength: periodLength,
        trainingDays: args.filter( a => a !== 0 ).length,
        success: sum === targetHours,
        rating: rating,
        ratingDescription: rating === 3 ? 'excellent job!!!' : rating === 2 ? 'not too bad but could be better' : 'lousy job',
        target: targetPerDay,
        average: average
    }
}


let arr: number[] = [3, 0, 2, 4.5, 0, 3, 1]
// let arrB: number[] = [3, 0, 4.5, 0, 1]
// let arrC: number[] = [3, 0, 0, 0, 1, 1]
// let arrD: number[] = [3, 2, 3,5, 2, 1,5, 3]

console.log( calculateExercises(arr, 2) )
console.log('==EX B==', calculateExercises(arrB, 2) )
console.log('==EX C==', calculateExercises(arrC, 2) )
console.log('==EX D==', calculateExercises(arrD, 2) )