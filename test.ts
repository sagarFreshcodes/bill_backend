function calculateOffset(limit: any = 5, pageNo: any = 0): number {
    // Ensure that limit and pageNo are valid numbers
    limit = Number(limit);
    pageNo = Number(pageNo);

    // Check if the conversion to numbers was successful, otherwise use default values
    if (isNaN(limit) || limit <= 0) {
        limit = 5; // Default limit
    }

    if (isNaN(pageNo) || pageNo < 0) {
        pageNo = 0; // Default page number
    }

    // Calculate the offset based on the limit and page number
    const offset = limit * pageNo;

    return offset;
}

// Example usage:
const limit = ""; // Default limit
const pageNo = "0"; // Default page number

const offset = calculateOffset(limit, pageNo);
console.log(`Offset: ${offset}`); // This will output "Offset: 0"
