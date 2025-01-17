import express, {Application} from 'express'
import cors from 'cors'
import morgan from 'morgan';
import config from './config'
import { logger } from './logger';
import { ProductRouter } from '../interface/routes/product.routes';

export class serverInfrastructure {

    private app : Application;
    private productRouter : ProductRouter
    constructor(){
        this.app = express()
        this.productRouter = new ProductRouter()
    }

    private initializeMiddleware():void{
        this.app.use(morgan('dev'))
        this.app.use(cors({ origin: "*", credentials: true }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    private configRoutes():void{
        this.app.use('/',this.productRouter.accessProductRoutes())
    }

    private startListening():void{
        const port = config.PORT
        this.app.listen(port,()=>{
            logger.info(`Server started successfully @PORT => ${port}`)
        })
    }

    public initializeServer():void{
        this.initializeMiddleware()
        this.configRoutes()
        this.startListening()
    }

}