import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export const getRedisClient = () => {
  if (!redis) {
    if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
      throw new Error("Redis env variables not loaded");
    }

    redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });
  }

  return redis;
};