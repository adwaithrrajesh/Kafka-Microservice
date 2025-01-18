export class productService {
    constructor() {}

    public async pingProductService(message:string): Promise<void> {
        console.log(message)
        console.log("product service got pinged")
        console.log('\n')
    }

    public async handleKafkaPayload(payload:any): Promise<void> {
        const {event,data} = JSON.parse(payload)
        switch(event){
            case'PING':
            this.pingProductService(data.message)
            break;
            default:
                break
        }
    }
}
