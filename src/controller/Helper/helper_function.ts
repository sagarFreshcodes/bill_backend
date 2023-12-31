import { Response } from "express";
import { messageData } from "../../Constant/message";
import { AppDataSource } from "../../database/databaseConnection";
import { EntityMetadata, EntityTarget, ObjectLiteral, Repository, UpdateResult, DeleteResult } from 'typeorm';
const secretkey = "secretkey"
import jwt from "jsonwebtoken"
import { Users } from "../../model/user_model";
import fs from "fs"
import csv from "csv-parser"
import parse from "papaparse"
export const SuccessResponce = (res: Response, data: any, message: any) => {
    res.status(200).json({
        message: message,
        status: 1,
        ...data
    })
}

export const ErrorResponce = (res: Response, data: any, message: any) => {
    res.status(500).json({
        message: message,
        status: 0,
        ...data
    })
}

export function Offset(limit: any = 5, pageNo: any = 0): number {
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

export const getOffset = (pageNo: number, limit: number): any => {
    try {
        if (pageNo === 0) {
            pageNo = 1
        }
        let offsetVal: number = (pageNo - 1) * limit;
        return offsetVal;
    } catch (error) {
        return 0
    }

}

export function commaSeparatedStringToArray(inputString: string) {
    if (typeof inputString !== 'string') {
        return []; // Return an empty array for non-string input
    }

    return inputString.split(',');
}
export async function GetUserRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    res: Response,
    Model: any,
    objectForAdd: any
): Promise<T | null> {
    try {
        // const record = await repository.find();
        const { limit, pageNo, orderBy, search } = objectForAdd
        const searchVal = search
        const order = orderBy.order || "DESC"
        const fieldName = orderBy.fieldName || "id"
        const entityMetadata: EntityMetadata = AppDataSource.getMetadata(Model);

        const excludedColumns = ['id', 'createdDate', 'updatedDate',]; // Add column names you want to exclude
        const conditions = entityMetadata.columns
            .filter((column) => !excludedColumns.includes(column.propertyName))
            .map((column) => {
                return `cast(users.${column.propertyName} as varchar) ILIKE :searchVal`
            })
            .join(' OR ');
        const [list, count] = await repository
            .createQueryBuilder("users")
            // .leftJoinAndSelect('users.role', 'role')
            // .andWhere('users.id !=:id', { id: 1 })
            .andWhere(
                searchVal && searchVal !== ''
                    ? conditions
                    : '1=1',
                { searchVal: `%${searchVal}%` }
            )
            .skip(getOffset(parseInt(pageNo || 0), limit))
            .take(limit)
            .orderBy(`${fieldName}`.includes(`role`) ? "role" : fieldName, order, "NULLS LAST")
            .getManyAndCount();
        const updateList = list.map((i) => { return { ...i, role: JSON.parse(i.role) || i.role } })

        SuccessResponce(res, { data: updateList, totalRecords: count }, messageData.USER_GET_SUCCESSFULL)
        return null;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}

export async function Add_user_record<T extends ObjectLiteral>(
    repository: Repository<T>,
    tableObject: any,
    res: Response
): Promise<T | null> {
    try {
        const userInserted = await repository.save(tableObject);
        jwt.sign({ userInserted }, secretkey, { expiresIn: '2 days' }, (err: any, token: any) => {

            const userWithToken = { ...userInserted, authToken: token }
            SuccessResponce(res, { data: userWithToken }, messageData.USER_ADD_SUCCESSFULL)

        });
        return null; // Return the saved entity 
    } catch (error) {
        // Handle the error here 
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}


export async function GetRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    res: Response,
    Model: any,
    objectForAdd: any
): Promise<T | null> {
    try {
        // const record = await repository.find();
        const { limit, pageNo, orderBy, search } = objectForAdd
        const searchVal = search
        const order = orderBy.order || "DESC"
        const fieldName = orderBy.fieldName || "id"
        const entityMetadata: EntityMetadata = AppDataSource.getMetadata(Model);

        const excludedColumns = ['id', 'createdDate', 'updatedDate',]; // Add column names you want to exclude
        const conditions = entityMetadata.columns
            .filter((column) => !excludedColumns.includes(column.propertyName))
            .map((column) => {
                return `cast(users.${column.propertyName} as varchar) ILIKE :searchVal`
            })
            .join(' OR ');
        const [list, count] = await repository
            .createQueryBuilder("users")
            // .leftJoinAndSelect('users.role', 'role')
            // .andWhere('users.id !=:id', { id: 1 })
            .andWhere(
                searchVal && searchVal !== ''
                    ? conditions
                    : '1=1',
                { searchVal: `%${searchVal}%` }
            )
            .skip(Offset(limit, pageNo))
            .take(limit)
            .orderBy(fieldName, order, "NULLS LAST")
            .getManyAndCount();


        SuccessResponce(res, { data: list, total_record: count }, messageData.USER_GET_SUCCESSFULL)
        return null;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}
export async function AddRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    tableObject: any,
    res: Response,
    message: any
): Promise<T | null> {
    try {
        const userInserted = await repository.save(tableObject);
        SuccessResponce(res, { data: userInserted }, message)
        return null; // Return the saved entity
    } catch (error) {
        // Handle the error here 
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}

export async function UpdateRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    recordId: any,
    updatedData: Partial<T>,
    res: Response,
    Model: any
): Promise<UpdateResult | null> {

    // console.log(Model, recordId);
    // console.log(updatedData);
    try {
        // const result = await repository.update(recordId, updatedData);


        await AppDataSource
            .createQueryBuilder()
            .update(Users, updatedData)
            .where("id = :id", { id: +recordId })
            .returning("*")
            .updateEntity(true)
            .execute()
            .then((update: any) => {
                if (update.raw.length != 0) {
                    SuccessResponce(res, update.raw[0], messageData.USER_UPDATE_SUCCESSFULL)
                } else {
                    ErrorResponce(res, {}, messageData.WRONG_ID)
                }
            })
            .catch((error: any) => {
                ErrorResponce(res, error, messageData.UNKNOWN)
            });
        return null;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}




export async function DeleteRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    recordId: number,
    res: Response
): Promise<DeleteResult | null> {
    try {
        const result = await repository.delete(recordId);
        SuccessResponce(res, {}, messageData.USER_DELETE_SUCCESSFULL)
        return result;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}

export function ObjectWithRequireKeysValue(inputObj: any, keysArray: { [key: string]: any }[]): any {
    const resultObj: any = {};

    for (const keyObj of keysArray) {
        const key = Object.keys(keyObj)[0];
        const defaultValue = keyObj[key];

        if (inputObj.hasOwnProperty(key)) {
            resultObj[key] = inputObj[key];
        } else {
            resultObj[key] = defaultValue;
        }
    }

    return resultObj;
}

export function ExtractKeys(inputObject: any, keysToExtract: string[]): Record<string, any> {
    const extractedObject: Record<string, any> = {};
    for (const key of keysToExtract) {
        if (inputObject.hasOwnProperty(key)) {
            extractedObject[key] = inputObject[key];
        }
    }

    return extractedObject;
}

// export function parseCSVFile(csvFile:any) {
//     return new Promise((resolve, reject) => {
//         const csvData: any[]  = [];

//         // Use csv-parser to parse the CSV file
//         fs.createReadStream(csvFile.tempFilePath)
//             .pipe(csv())
//             .on('data', (data) => csvData.push(data))
//             .on('end', () => {
//                 // At this point, 'results' will contain an array of objects, with each object representing a row in the CSV file.
//                 console.log(`csvData=>`, csvData);
//             })
//             .on('error', (error) => {
//                 reject(error);
//             });
//     });
// }
interface FilterOptions {
    keysToKeep: string[]; // Keys to keep in each object
    idKey: string; // Array of valid keys that must match
}

export function FilterObjectsForValidDatabaseField(inputArray: any[], options: FilterOptions): any[] {
    const { keysToKeep, idKey } = options;

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




export function parseCSVFile(csvFile: any, options: any) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(csvFile.file.tempFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Parse the CSV data
                parse.parse(data, {
                    header: true, // Treat the first row as the header row
                    dynamicTyping: true, // Automatically convert values to appropriate data types
                    complete: function (results) {
                        // At this point, 'results.data' will contain an array of objects, with each object representing a row in the CSV file.

                        const data = FilterObjectsForValidDatabaseField(results.data, options)
                        resolve(data)


                    },
                });
            });
        } catch (error) {
            reject([])
        }

    });
}

export function removeQuotesFromKeys(data: any[]): any[] {
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






// // Example usage:
// const inputArray = [
//     { category_name: 'Printer', status: 'active', price: 100, jjj: 'jj' },
//     { category_name: 'Desktop', status: 'active', price: null },
//     { category_name: 'Computer', status: 'active', price: undefined },
//     { category_name: 'Electronics', status: 'active', price: '' },
//     { category_name: 'jjj' },
// ];

// const options: FilterOptions = {
//     keysToKeep: ['category_name', 'status'],
//     validKeys: ['category_name', 'status',],
// };

// const filteredArray = filterObjects(inputArray, options);

export function TransformObjectsWithSelectedKey(inputArray: any, keysToKeep: any) {
    return inputArray.map((obj: { [x: string]: any; }) => {
        const newObj: any = {};
        keysToKeep.forEach((key: string | number) => {
            if (obj[key] !== undefined) {
                if (key == "status") {
                    newObj[key] = +`${obj[key]}` || 0;
                } else {
                    newObj[key] = obj[key];
                }

            }
        });
        return newObj;
    });
}


export function ChangeObjectByStatus(inputArray: any, keysToKeep: any) {
    return inputArray.map((obj: { [x: string]: any; }) => {
        const newObj: any = {};
        keysToKeep.forEach((key: string | number) => {
            if (obj[key] !== undefined) {
                if (key == "status") {
                    newObj[key] = ["active", "Active"].includes(`${obj[key]}`) ? 1 : 0;
                } else {
                    newObj[key] = obj[key];
                }

            }
        });
        return newObj;
    });
}


export const ReturnFilterValue = (data: any[]) => {
    const value: any = []
    data.map((i: any) => {
        value.push(...i.value)
    })
    return value
}

export const KeyWiseFilterData = (filterData: any) => {
    const filterValues: any = []
    filterData.map((i: { fieldname: any; value: any; }) => filterValues[`${i.fieldname}_values`] = i.value)
    return filterValues
}


export function ExtractFilterArrayWithKey(obj: Record<string, any>): { fieldname: string, value: any[] }[] {
    const result: { fieldname: string, value: any[] }[] = [];

    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            result.push({ fieldname: key, value: obj[key] });
        }
    }

    return result;
}

export function transformObjectWith_values(inputObject: any) {
    const outputObject: any = {};

    for (const key in inputObject) {
        if (inputObject.hasOwnProperty(key)) {
            const values = inputObject[key];

            values.forEach((value: any) => {
                const newKey = `${value}_values`;
                outputObject[newKey] = `%${value}%`;
            });
        }
    }

    return outputObject;
}