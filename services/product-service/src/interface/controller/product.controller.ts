import { Request,Response,NextFunction } from "express"

export class productController{
    constructor(){}

    public async ping(req:Request, res:Response,next:NextFunction){
        return res.status(200).json({message:"PING TESTED PRODUCT SERVICE"})
    }
}