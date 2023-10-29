import { Response } from "express";

export const SuccesResponce = (res: Response, data: object, message: any) => {
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