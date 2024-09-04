const Redis = require("ioredis");
import redisConfig from "../../config/redis";

const subscriber = new Redis(redisConfig.CONNECTION_STRING);

export default subscriber;
