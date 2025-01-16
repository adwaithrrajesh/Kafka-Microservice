import { Request,Response,NextFunction } from "express"

export class userController{
    constructor(){}

    public async pingUser(req:Request, res:Response,next:NextFunction){
        return res.status(200).json({message:"PING THE CONTROLLER"})
    }
}