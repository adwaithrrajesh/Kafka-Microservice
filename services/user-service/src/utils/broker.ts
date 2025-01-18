import { Kafka, logLevel } from 'kafkajs';
import config from '../infrastructure/config';
import { userService } from '../services/user.service';

const KAFKA_GROUP = 'user-group';
const KAFKA_TOPIC = 'user-topic';

export class KafkaBroker {

    private static kafkaClient: Kafka | null = null; 
    private UserService : userService

    constructor(){
        this.UserService = new userService()
    }

    /**
     * Initializes the Kafka client if not already initialized.
     */
    public async createKafkaClient(): Promise<void> {
        if (!KafkaBroker.kafkaClient) {
            console.log('Starting Kafka...');
            KafkaBroker.kafkaClient = new Kafka({
                clientId: 'microservices-base',
                brokers: [config.KAFKA_BROKER],
                logLevel: logLevel.ERROR,
            });
            console.log('Kafka Client Initialized successfully');
        }
    }

    /**
     * Ensures the Kafka client is initialized and returns it.
     * @returns The Kafka client instance
     */
    private static getKafkaClient(): Kafka {
        if (!KafkaBroker.kafkaClient) {
            throw new Error('Kafka client is not initialized. Call createKafkaClient() first.');
        }
        return KafkaBroker.kafkaClient;
    }

    /**
     * Publishes a message to a specified Kafka topic.
     * @param topic Kafka topic name
     * @param payload Message payload
     */
    public async KafkaPublish(topic: string, payload: any): Promise<void> {

        const kafkaClient = KafkaBroker.getKafkaClient(); 

        const producer = kafkaClient.producer();
        await producer.connect();

        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(payload) }],
        });

        console.log('kafka published',topic)

        await producer.disconnect();
    }

    
    public async KafkaSubscribe():Promise<void>{
        console.log('kafka subscribed to user microservice')
        const kafka = KafkaBroker.getKafkaClient();
        const consumer = kafka.consumer({groupId:KAFKA_GROUP})
        consumer.connect();

        await consumer.subscribe({topic:KAFKA_TOPIC,fromBeginning:true})

        await consumer.run({
            eachMessage: async ({message}) =>{
                this.UserService.handleKafkaPayload(message.value?.toString())
            }
        })
    }
    
}
