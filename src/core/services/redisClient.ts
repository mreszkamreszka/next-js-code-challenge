import Redis from 'ioredis';

const isServer = typeof window === 'undefined';
const redisUrl = process.env.REDIS_URL;

const redis: Redis | null = isServer && redisUrl ? new Redis(redisUrl) : null;

if (isServer && !redisUrl) {
  console.warn(
    'REDIS_URL is not defined. Redis caching for Pokemon list will be disabled.',
  );
}

export default redis;
