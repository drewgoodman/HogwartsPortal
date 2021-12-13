import { NUM_TO_MONTHS } from "../constants/baseConstants"

export const numToNthYear = (year) => {
    const words = ['Zero', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh']
    return words[year]
}

export const checkMonthRollover = (month) => {

    if (month === -1) { return 0 }
    return month
}

export const numToMonths = (num) => {
    
    const month = checkMonthRollover(parseInt(num) - 1)
    return NUM_TO_MONTHS[month]

}