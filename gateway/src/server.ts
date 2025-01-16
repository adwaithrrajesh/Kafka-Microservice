import { ServerInfrastructure } from "./infrastructure/serverInfrastructure";

class gatewayServer {
    private server : ServerInfrastructure
    constructor(){
        this.server = new ServerInfrastructure()
    }

    public async startServer():Promise<void>{
        try {
            this.server.initializeServer();
        } catch (error) {
            console.warn(error);
            process.exit(1);
        }
    }
}

const server = new gatewayServer()
server.startServer();