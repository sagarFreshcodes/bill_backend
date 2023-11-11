const data = [
    {
        "fieldname": "model_no",
        "value": [
            "B40 LENOVO"
        ]
    },
    {
        "fieldname": "purchase_date",
        "value": [
            "2022-10-22"
        ]
    }
]


// for(const i of data){

//     console.log(`user.${i.fieldname} IN (:...${i.fieldname})s`, { ids: i.value });

// }

const ReturnFilterValue = (data:any[]) =>{
    const value: any = []
    data.map((i: any) => { 
        value.push(...i.value)
    })
    return value
} 
console.log(ReturnFilterValue(data));

