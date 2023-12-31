import { Request, Response } from "express";
import { messageData } from "../../Constant/message";
import { AppDataSource } from "../../database/databaseConnection";
import { EntityMetadata, EntityTarget, ObjectLiteral, Repository, UpdateResult, DeleteResult, getConnection } from 'typeorm';
import { ChangeObjectByStatus, ErrorResponce, KeyWiseFilterData, Offset, SuccessResponce, TransformObjectsWithSelectedKey, commaSeparatedStringToArray, getOffset, transformObjectWith_values } from "../Helper/helper_function";
import { log } from "console";

export async function GetTestData<T extends ObjectLiteral>(
    repository: Repository<T>,
    res: Response,
    Model: any,
    objectForAdd: any,
    message: any,
    other: any
): Promise<T | null> {
    try {
        // const record = await repository.find();
        const { limit, pageNo, orderBy, search } = objectForAdd
        const { isFilter, filterValue, filterData } = other
        const searchVal = search
        const order = orderBy.order || "DESC"
        const fieldName = orderBy.fieldName || "id"
        const entityMetadata: EntityMetadata = AppDataSource.getMetadata(Model);
        const excludedColumns = ['id', 'createdDate', 'updatedDate',]; // Add column names you want to exclude


        const conditions = entityMetadata.columns
            .filter((column) => !excludedColumns.includes(column.propertyName))
            .map((column) => {

                return `cast(${Model}.${column.propertyName} as varchar) ILIKE :searchVal`
            })
            .join(' OR ');

        const FilterCondition = filterData.map((i: any) => {


            console.log(`===========>>>>>>> ${Model}.${i.fieldname} <<<<<<<<<<< 'json' ${i.fieldname, 'json'} `);
            const fd = `cast(${Model}.${i.fieldname} as varchar) IN (:...filterVal)`
            return fd;


        }).join(" OR ")
        const [list, count] = await repository
            .createQueryBuilder(`${Model}`)
            .andWhere(
                searchVal && searchVal !== ''
                    ? conditions
                    : '1=1',
                { searchVal: `%${searchVal}%` }
            )
            .andWhere(
                isFilter && isFilter
                    ? FilterCondition
                    : '1=1',
                { filterVal: filterValue }
            )
            .skip(getOffset(parseInt(pageNo || 0), limit))
            .take(limit)
            .orderBy(fieldName, order, "NULLS LAST")
            .getManyAndCount();


        const filterKey = 'name';
        const filterValue2 = 'n';
        const Test_name = 'a';

        const filteredRecords = await repository
            .createQueryBuilder(`${Model}`)
            // .where(`${Model}.json->>'${filterKey}' = :filterValue2`, { filterValue2 }) 
            // .where(`${Model}.Test_name = :Test_name`, { Test_name })
            .where(`${Model}.json = :filterValue2`, { filterValue2 })
            .getMany();

        console.log("filteredRecords+++++++++++", filteredRecords);



        SuccessResponce(res, { data: list, totalRecords: count }, message)
        return null;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}
export async function GetTestData2<T extends ObjectLiteral>(
    repository: Repository<T>,
    res: Response,
    Model: any,
    objectForAdd: any,
    message: any,
    other: object
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
            .map((column) => `cast(${Model}.${column.propertyName} as varchar) ILIKE :searchVal`)
            .join(' OR ');
        console.log("=======>", conditions, "++++++++");

        const conditions2 = `cast(${Model}.Test_name as varchar) IN (:...searchVal)`
        const [list, count] = await repository
            .createQueryBuilder(`${Model}`)
            .andWhere(
                searchVal && searchVal !== ''
                    ? conditions2
                    : '1=1',
                { searchVal: ["te12", "te1"] }
            )
            .skip(getOffset(parseInt(pageNo || 0), limit))
            .take(limit)
            .orderBy(fieldName, order, "NULLS LAST")
            .getManyAndCount();
        SuccessResponce(res, { data: list, totalRecords: count }, message)
        return null;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}
export async function GetRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    res: Response,
    Model: any,
    objectForAdd: any,
    message: any,
    other: any
): Promise<T | null> {
    try {
        // const record = await repository.find();
        const { limit, pageNo, orderBy, search } = objectForAdd
        const { isFilter, filterValue, filterData } = other
        const keyWiseFilterData = KeyWiseFilterData(filterData)
        const keyWiseFilterValues = transformObjectWith_values(keyWiseFilterData)
        const searchVal = search
        const order = orderBy.order || "DESC"
        const fieldName = orderBy.fieldName || "id"
        const entityMetadata: EntityMetadata = AppDataSource.getMetadata(Model);
        const excludedColumns = ['id', 'createdDate', 'updatedDate',]; // Add column names you want to exclude


        const conditions = entityMetadata.columns
            .filter((column) => !excludedColumns.includes(column.propertyName))
            .map((column) => `cast(${Model}.${column.propertyName} as varchar) ILIKE :searchVal`)
            .join(' OR ');



        const FilterCondition = filterData.map((i: any) => {
            const filterKey = Object.keys(keyWiseFilterData).filter((e: string | string[]) => e.includes(i.fieldname))[0]
            const valuesUnderKey = keyWiseFilterData[filterKey]
            const KeyFilterCondition = valuesUnderKey.map((v: any) => {
                const fd2 = `cast(${Model}.${i.fieldname} as varchar) ILIKE :${v}_values`
                return fd2;
            }).join(' OR ')
            const fd = KeyFilterCondition
            return fd;
        }).join(" OR ")

        const [list, count] = await repository
            .createQueryBuilder(`${Model}`)
            .andWhere(
                searchVal && searchVal !== ''
                    ? conditions
                    : '1=1',
                { searchVal: `%${searchVal}%` }
            ).andWhere(
                isFilter && isFilter
                    ? FilterCondition
                    : '1=1',
                { ...keyWiseFilterValues }
            )
            .skip(getOffset(parseInt(pageNo || 0), limit))
            .take(limit)
            .orderBy(fieldName, order, "NULLS LAST")
            .getManyAndCount();
        SuccessResponce(res, { data: list, totalRecords: count }, message)
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
    message: any,
    other: object
): Promise<T | null> {
    try {
        const userInserted = await repository.save(tableObject);
        SuccessResponce(res, { data: { data: userInserted } }, message)
        return null; // Return the saved entity
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}




export async function AddMultipalRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    tableObject: any,
    res: Response,
    message: any,
    recordArray: any,
    entity: any, keysToKeep: any,
    other: object
): Promise<T | null> {
    try {

        // const userInserted = await repository.save(tableObject);

        const validArray = ChangeObjectByStatus(recordArray, keysToKeep);

        console.log("validArray============>>>>>>>>>>>", validArray);
        for (const record of validArray) {
            await AppDataSource.createQueryBuilder()
                .insert()
                .into(entity)
                .values(record)
                .execute();
        }

        SuccessResponce(res, { data: { data: {} } }, message)
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
    Model: any,
    message: any,
    other: object
): Promise<UpdateResult | null> {


    try {
        await AppDataSource
            .createQueryBuilder()
            .update(Model, updatedData)
            .where("id = :id", { id: recordId })
            .returning("*")
            .updateEntity(true)
            .execute()
            .then((update: any) => {
                if (update.raw.length != 0) {
                    SuccessResponce(res, { data: update.raw[0] }, message)
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
    const { tableName } = req.body

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


export async function ExportRecord<T extends ObjectLiteral>(
    repository: Repository<T>,
    res: Response,
    Model: any,
    objectForAdd: any,
    message: any,
    field: any,
    other: object
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
                return `cast(${Model}.${column.propertyName} as varchar) ILIKE :searchVal`
            })
            .join(' OR ');


        const [list, count] = await repository
            .createQueryBuilder(`${Model}`)
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


        const renewArray = TransformObjectsWithSelectedKey(list, field);
        SuccessResponce(res, { data: renewArray, total_record: count }, message)
        return null;
    } catch (error) {
        ErrorResponce(res, error, messageData.UNKNOWN)
        return null;
    }
}



