
const calculateBmi = (pituus: number, paino: number) => {
    let kerroin: number = 0.01

    pituus = pituus * kerroin
    const bmi = paino / ( pituus * pituus ) 
    // console.log(bmi)

    if( 19 <= bmi && bmi <= 25) {
        return 'Normal (healthy weight)'
    } else {
        return 'Underweight or overweight (unhealthy weight)'
    }
    
}

console.log(calculateBmi(180, 74))