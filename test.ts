interface FilterOptions {
    keysToKeep: string[]; // Keys to keep in each object
}

function filterObjects(inputArray: any[], idKey: string, options: FilterOptions): any[] {
    const { keysToKeep } = options;

    return inputArray
        .filter((obj) => {
            // Set default value for idKey if it doesn't exist in the object
            obj[idKey] = obj[idKey] || '';

            // Set default value for keysToKeep if they don't exist or have null/undefined/blank values
            keysToKeep.forEach((key) => {
                obj[key] = obj[key] || '';
            });

            // Filter out objects with idKey value being null, undefined, or empty string
            return obj[idKey] !== null && obj[idKey] !== undefined && obj[idKey] !== '';
        })
        .map((obj) => {
            // Keep only the specified keys and their values
            const filteredObj: { [key: string]: any } = {}; 
            keysToKeep.forEach((key) => {
                filteredObj[key] = obj[key];
            });
            return filteredObj;
        });
}

// Example usage:
const inputArray = [
    { id: "1", category_name: 'Printer', status: 'active', price: 100 },
    { category_name: 'Desktop', status: 'active', price: null },
    { category_name: 'Computer', status: 'active', price: undefined },
    { category_name: 'Electronics', status: 'active', price: '' },
    { category_name: 'Laptop', status: 'active' },
];

const options: FilterOptions = {
    keysToKeep: ['category_name', 'status'],
};

const filteredArray = filterObjects(inputArray, 'id', options);

console.log(filteredArray);
