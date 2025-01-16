import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import config from "./config";
import helmet from 'helmet'
import {logger} from './logger'


export class ServerInfrastructure {
    private app: Application;

    constructor() {
        this.app = express();
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
    }
}
