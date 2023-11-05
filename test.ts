function commaSeparatedStringToArray(inputString:string) {
    if (typeof inputString !== 'string') {
        return []; // Return an empty array for non-string input
    }

    return inputString.split(',');
}

const inputString = "4";
const resultArray = commaSeparatedStringToArray(inputString);

console.log(resultArray); // Output: ["4", "3"]
