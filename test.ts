function extractNumbersFromString(inputString: string): number[] {
    const numbersArray: number[] = inputString
        .split(',')
        .map((item) => parseInt(item.trim(), 10))
        .filter((number) => !isNaN(number));

    return numbersArray;
}

const inputString: string = 'vsdafas';
const result: number[] = extractNumbersFromString(inputString);
console.log(result); // Output: [1, 2, 3, 4]
