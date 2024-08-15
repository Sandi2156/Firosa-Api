const Redis = require("ioredis");

const subscriber = new Redis(
  `rediss://default:${process.env.REDIS_PASSWORD}@caching-1529a761-sandipan-050b.g.aivencloud.com:24119`
);

export default subscriber;
