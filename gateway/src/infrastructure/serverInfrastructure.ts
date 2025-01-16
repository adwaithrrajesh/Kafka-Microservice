import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import config from "./config";
import helmet from 'helmet'
import {logger} from './logger'
import { RouteConfig } from "./route-config/route.config";

export class ServerInfrastructure {
    private app: Application;
    private routeConfigurer:RouteConfig;

    constructor() {
        this.app = express();
        this.routeConfigurer = new RouteConfig()
    }

    /**
     * Configures and initializes server middlewares.
     */
    private initializeMiddlewares(): void {
        this.configureMorgan();
        this.app.use(cors({ origin: "*", credentials: true }));
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    /**
     * @morgan Configuration
     */

    private configureMorgan(): void {
        const logFormat = config.NODE_ENV === "production" ? "combined" : "dev";
        this.app.use(morgan(logFormat));
        if (config.NODE_ENV === "production") {
            const logDirectory = path.join(path.resolve(), "logs");
            if (!fs.existsSync(logDirectory)) {
                fs.mkdirSync(logDirectory);
            }
            const logStream = fs.createWriteStream(path.join(logDirectory, "requests.log"), { flags: "a" });
            this.app.use(morgan("combined", { stream: logStream }));
        }
    }

    /**
     * @route - config
     */

    private async routeConfig(): Promise<void> {
        await this.routeConfigurer.config(this.app);
    }



    private startListening(): void {
        const port = config.PORT;
        this.app.listen(port, () => {
            console.log('\n')
            console.log(' ██████╗  █████╗ ████████╗███████╗██╗    ██╗ █████╗ ██╗   ██╗    ██╗███████╗     ██████╗ ███╗   ██╗██╗     ██╗███╗   ██╗███████╗')
            console.log('██╔════╝ ██╔══██╗╚══██╔══╝██╔════╝██║    ██║██╔══██╗╚██╗ ██╔╝    ██║██╔════╝    ██╔═══██╗████╗  ██║██║     ██║████╗  ██║██╔════╝')
            console.log('██║  ███╗███████║   ██║   █████╗  ██║ █╗ ██║███████║ ╚████╔╝     ██║███████╗    ██║   ██║██╔██╗ ██║██║     ██║██╔██╗ ██║█████╗  ')
            console.log('██║   ██║██╔══██║   ██║   ██╔══╝  ██║███╗██║██╔══██║  ╚██╔╝      ██║╚════██║    ██║   ██║██║╚██╗██║██║     ██║██║╚██╗██║██╔══╝  ')
            console.log('╚██████╔╝██║  ██║   ██║   ███████╗╚███╔███╔╝██║  ██║   ██║       ██║███████║    ╚██████╔╝██║ ╚████║███████╗██║██║ ╚████║███████╗')
            console.log(' ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝       ╚═╝╚══════╝     ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝╚═╝  ╚═══╝╚══════╝')
            console.log('\n')
            logger.info(`Server listening on port ${port}`);
        }).on("error", (error) => {
            logger.error("Server Error:", error);
            process.exit(1);
        });
    }

    public initializeServer():void {
        this.initializeMiddlewares()
        this.startListening()
        this.routeConfig()
    }
}
