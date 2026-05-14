"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = void 0;
const redis_1 = require("@upstash/redis");
let redis = null;
const getRedisClient = () => {
    if (!redis) {
        if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
            throw new Error("Redis env variables not loaded");
        }
        redis = new redis_1.Redis({
            url: process.env.REDIS_URL,
            token: process.env.REDIS_TOKEN,
        });
    }
    return redis;
};
exports.getRedisClient = getRedisClient;
//# sourceMappingURL=redis.js.map