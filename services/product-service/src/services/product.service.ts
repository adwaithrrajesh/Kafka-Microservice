export class productService {
    constructor() {}

    public async pingProductService(message:string): Promise<void> {
        console.log(message)
        console.log("product service got pinged")
        console.log('\n')
    }


    public async addProduct(data:object):Promise<void>{
        console.log(data)
    }

    public async handleKafkaPayload(payload:any): Promise<void> {
        const {event,data} = JSON.parse(payload)

        console.log(data)
        switch(event){
            case'PING':
            this.pingProductService(data.message)
            break;
            case'AddProduct':
            this.addProduct(data)
            break;
            default:
                break
        }
    }
}
