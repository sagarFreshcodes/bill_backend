const data = [
    {
        "fieldname": "model_no",
        "value": [
            "B40 LENOVO", "B40 LENOVO"
        ]
    },
    {
        "fieldname": "purchase_date",
        "value": [
            "2022-10-22"
        ]
    }]
const filter = (filterData: any) => {
    const filterValues: any = {}
    data.map((i) => filterValues[`${i.fieldname}_values`] = i.value)
    return filterValues
}
// console.log(filter(data));


function getKeyArrayValues(obj: Record<string, any>): { fieldname: string, value: any[] }[] {
    const result: { fieldname: string, value: any[] }[] = [];

    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            result.push({ fieldname: key, value: obj[key] });
        }
    }

    return result;
}

// Example usage:
const sampleObject = {
    key1: [1, 2, 3],
    key2: 'not an array',
    key3: [4, 5, 6],
    key4: ['a', 'b', 'c']
};

const result = getKeyArrayValues(sampleObject);
console.log(result);




