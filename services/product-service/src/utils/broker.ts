import { Kafka, logLevel } from 'kafkajs';
import config from '../infrastructure/config';

const KAFKA_GROUP = 'product-group';
const KAFKA_TOPIC = 'product-topic';

export class KafkaBroker {

    private static kafkaClient: Kafka | null = null; 

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
            messages: [{ value: payload }],
        });

        await producer.disconnect();
    }

    
}
