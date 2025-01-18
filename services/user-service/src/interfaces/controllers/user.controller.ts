import { Request,Response,NextFunction } from "express"
import { KafkaBroker } from "../../utils/broker"

export class userController{
    
    private kafka: KafkaBroker

    constructor(){
        this.kafka = new KafkaBroker()
    }

    public async pingUser(req:Request, res:Response,next:NextFunction){
        return res.status(200).json({message:"PING THE CONTROLLER"})
    }

    public async pingProduct(req:Request,res:Response,next:NextFunction){
        const payload = {
            event: "PING",
            data: {message:"Hello from user service"},
        };
        this.kafka.KafkaPublish('product-topic',payload)
        return res.status(200).json({message:"Send a PING to product service"})
    }
}