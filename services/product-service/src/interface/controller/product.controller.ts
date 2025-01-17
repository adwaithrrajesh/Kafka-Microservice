import { Request,Response,NextFunction } from "express"
import { Kafka } from 'kafkajs';


export class productController{

    constructor() {}

    public async pingUser(req:Request, res:Response,next:NextFunction){
        return res.status(200).json({message:"PING TESTED PRODUCT SERVICE"})
    }
}