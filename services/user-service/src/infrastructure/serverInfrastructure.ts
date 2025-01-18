import express,{ Application } from "express";
import cors from "cors";
import helmet from 'helmet'
import config from "./config";
import { logger } from "./logger";
import { UserRouter } from "../interfaces/routes/user.routes";
import morgan from "morgan";
import { KafkaBroker } from "../utils/broker";

export class serverInfrastructure{
    
    private app:Application;
    private route : UserRouter
    private kafka : KafkaBroker


    constructor(){
        this.app = express();
        this.route = new UserRouter();
        this.kafka = new KafkaBroker();
    }


    private initializeMiddleware():void{
        this.app.use(morgan('dev'))
        this.app.use(cors({ origin: "*", credentials: true }));
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private async configMessageBrokers(): Promise<void> {
        await this.kafka.createKafkaClient()
        await this.kafka.KafkaSubscribe()
    }

    private configRoutes():void{
        this.app.use('/',this.route.accessUserRoutes())
    }

    private startListening(): void {
        const port = config.PORT;
        this.app.listen(port, () => {
            logger.info(`Initiated user service on PORT : ${port}`);
        }).on("error", (error) => {
            logger.error("Server Error:", error);
            process.exit(1);
        });
    }

    public initializeServer():void{
        this.initializeMiddleware()
        this.configMessageBrokers()
        this.configRoutes()
        this.startListening()
    }

}