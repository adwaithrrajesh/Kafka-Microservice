import { serverInfrastructure } from "./infrastructure/serverInfrastructure";


class userService{
    private server:serverInfrastructure;
    constructor(){
        this.server = new serverInfrastructure();
    }

    public async startServer():Promise<void>{
        this.server.initializeServer()
    }
}

const mainServer = new userService()
mainServer.startServer()
