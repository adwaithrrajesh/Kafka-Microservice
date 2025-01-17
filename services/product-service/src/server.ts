import { serverInfrastructure } from "./infrastructure/serverInfrastructure";

class productService {

    private server:serverInfrastructure;
    constructor(){
        this.server = new serverInfrastructure()
    }

    public async launchServer():Promise<void>{
         this.server.initializeServer()
    }

}

const mainServer = new productService()
mainServer.launchServer()