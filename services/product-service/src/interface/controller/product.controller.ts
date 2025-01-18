import { Request,Response,NextFunction } from "express"
import { Kafka } from 'kafkajs';
import { KafkaBroker } from "../../utils/broker";


export class productController {
    private kafkaBroker: KafkaBroker;

    constructor() {
        this.kafkaBroker = new KafkaBroker();
    }

    public async pingUser(req: Request, res: Response, next: NextFunction) {
        const payload = {
            event: "PING",
            data: { message: "Hello from product service" },
        };
        await this.kafkaBroker.KafkaPublish("user-topic", payload);
        return res.status(200).json({ message: "SEND A PING TO USER SERVICE" });
    }
}