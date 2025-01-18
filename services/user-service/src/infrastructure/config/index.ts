import dotenv from 'dotenv'
dotenv.config()

/***
 * All the env files will globally available from here
 */

export default{
    PORT:process.env.PORT,
    KAFKA_BROKER:process.env.KAFKA_BROKER || ''
}