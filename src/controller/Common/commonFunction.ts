import { Request, Response } from "express";
import { messageData } from "../../Constant/message";
import { AppDataSource } from "../../database/databaseConnection";
import { EntityMetadata, EntityTarget, ObjectLiteral, Repository, UpdateResult, DeleteResult, getConnection } from 'typeorm';
const secretkey = "secretkey"
import jwt from "jsonwebtoken"
import { User } from "../../model/user_model";
import { ErrorResponce, Offset, SuccessResponce, commaSeparatedStringToArray } from "../Helper/helper_function";





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




export async function DeleteMultipalRecords(
    req: Request,
    res: Response
) {
    const { ids, tableName } = req.body
    const idsArray = commaSeparatedStringToArray(ids)

    try {
        const tableRepository = AppDataSource.getRepository(tableName)
        await tableRepository
            .createQueryBuilder(`${tableName}`.toLowerCase())
            .delete().whereInIds(idsArray)
            .execute().then((deleteRes) => {
                if (deleteRes.affected)
                    SuccessResponce(res, {}, messageData.RECORDS_DELETE_SUCCESSFULL)
                else
                    ErrorResponce(res, {}, messageData.INVALID_ID)
            }).catch(error => {
                ErrorResponce(res, error, messageData.UNKNOWN)
            });
        return null;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}



export async function DeleteAllRecords(
    req: Request,
    res: Response
) {
    const {tableName } = req.body 

    try {
        const tableRepository = AppDataSource.getRepository(tableName)
        await tableRepository
            .createQueryBuilder(`${tableName}`.toLowerCase())
            .delete()
            .execute().then((deleteRes) => { 
                    SuccessResponce(res, {}, messageData.RECORDS_DELETE_SUCCESSFULL)
               
            }).catch(error => {
                ErrorResponce(res, error, messageData.UNKNOWN)
            });
        return null;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}



