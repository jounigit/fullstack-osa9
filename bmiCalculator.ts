
// interface CalculateValues {
//     value1: number;
//     value2: number;
// }

// const parseArguments = (args: Array<string>): CalculateValues => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');
  
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//       return {
//         value1: Number(args[2]),
//         value2: Number(args[3])
//       }
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
//   }

    export const calculateBmi = (pituus: number, paino: number) => {
    pituus = pituus * 0.01;
    const bmi = paino / ( pituus * pituus );
    // console.log(bmi)
    const result = 25 <= bmi ? 'Overweight' : 19 <= bmi ? 'Normal (healthy weight)' : 'Underweight';
    console.log(result);
    return result;
};

// try {
//     const { value1, value2 } = parseArguments(process.argv);
//     calculateBmi(value1, value2);
//   } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
//   }
