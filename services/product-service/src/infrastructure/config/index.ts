import dotenv from 'dotenv'

dotenv.config();

export default{
    PORT: process.env.PORT,
    KAFKA_BROKER: process.env.KAFKA_BROKER || ''
}