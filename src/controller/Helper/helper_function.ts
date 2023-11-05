import { Response } from "express";
import { messageData } from "../../Constant/message";
import { AppDataSource } from "../../database/databaseConnection";
import { EntityMetadata, EntityTarget, ObjectLiteral, Repository, UpdateResult, DeleteResult } from 'typeorm';
const secretkey = "secretkey"
import jwt from "jsonwebtoken"
import { User } from "../../model/user_model";
export const SuccessResponce = (res: Response, data: any, message: any) => {
    res.status(200).json({
        message: message,
        status: 1,
        data: data
    })
}

export const ErrorResponce = (res: Response, data: any, message: any) => {
    res.status(500).json({
        message: message,
        status: 0,
        data: data
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
            .orderBy(fieldName, order, "NULLS LAST")
            .getManyAndCount();
        const updateList = list.map((i) => { return { ...i, role: JSON.parse(i.role) || i.role } })

        SuccessResponce(res, { data: updateList, total_record: count }, messageData.USER_GET_SUCCESSFULL)
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
export async function AddRecord2<T extends ObjectLiteral>(
    repository: Repository<T>,
    tableObject: any,
    res: Response
): Promise<T | null> {
    try {
        const userInserted = await repository.save(tableObject);
        SuccessResponce(res, userInserted, messageData.USER_ADD_SUCCESSFULL)
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
            .update(User, updatedData)
            .where("id = :id", { id: 7 })
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

