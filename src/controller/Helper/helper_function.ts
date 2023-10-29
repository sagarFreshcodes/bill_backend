import { Response } from "express";
import { messageData } from "../../Constant/message"; 
import { EntityTarget, ObjectLiteral, Repository, UpdateResult, DeleteResult } from 'typeorm';
export const SuccessResponce = (res: Response, data: any, message: any) => {
    res.status(200).json({
        message: message,
        data: data
    })
}


export const ErrorResponce = (res: Response, data: any, message: any) => {
    res.status(500).json({
        message: message,
        data: data
    })
}


// export const UpdateRecord = (Repository:Repository<T>, id:number, objectForUpadate:any, res:Response )=>{
//     [Repository].update(id, objectForUpadate).then(async (response: any) => {
//         const updatedRecord = await [Repository].findOneBy({ id: id });
//         SuccessResponce(res, updatedRecord, messageData.USER_UPDATE_SUCCESSFULL)
//     }).catch((error: any) => {
//         ErrorResponce(res, error, messageData.UNKNOWN)
//     })
// }

export async function AddRecord<T extends ObjectLiteral>(
    repository: Repository<T>, 
    tableObject:any,
    res: Response
): Promise<T | null> {
    try { 
        const userInserted = await repository.save(tableObject);
        SuccessResponce(res, userInserted, messageData.USER_ADD_SUCCESSFULL)
        return null; // Return the saved entity
    } catch (error) {
        // Handle the error here
        console.error(error);
        return null;
    }
}



export async function UpdateRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    recordId: any,
    updatedData: Partial<T>,
    res: Response
): Promise<UpdateResult | null> {
    try {
        const result = await repository.update(recordId, updatedData);
        const updatedRecord = await repository.findOneBy({ id: recordId});
        SuccessResponce(res, updatedRecord, messageData.USER_UPDATE_SUCCESSFULL)
        return result;
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

