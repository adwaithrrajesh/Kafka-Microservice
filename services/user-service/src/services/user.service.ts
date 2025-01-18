import { logger } from "../infrastructure/logger"

export class userService {
    constructor() {}

    private async pingUserService(message: string): Promise<void> {
        console.log(message)
        console.log('user service got pinged')
        console.log('\n')
    }

    public async handleKafkaPayload(payload: any): Promise<void> {
        const {event,data} = JSON.parse(payload)

        switch(event){
            case 'PING':
                this.pingUserService(data?.message)
                break
            default:
                break
        }
    }


}
