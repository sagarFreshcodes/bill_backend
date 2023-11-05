function removeQuotesFromKeys(data: any[]): any[] {
    if (!Array.isArray(data)) {
        return data; // Return data as is if it's not an array
    }

    return data.map((item) => {
        if (typeof item === 'object' && item !== null) {
            const newItem: { [key: string]: any } = {};
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    const newKey = key.replace(/'/g, ''); // Remove single quotes
                    newItem[newKey] = item[key];
                }
            }
            return newItem;
        } else {
            return item;
        }
    });
}

// Example usage:
const data = [
    { 'category_name': 'Printer', status: 'active' },
    { 'category_name': 'Desktop', status: 'active' },
    { 'category_name': 'Computer', status: 'active' },
    { 'category_name': 'Electronics', status: 'active' },
    { 'category_name': 'Laptop', status: 'active' }
]

const updatedData = removeQuotesFromKeys(data);
console.log(updatedData);
