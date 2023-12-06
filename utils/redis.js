import { promisify } from 'util';
import { createClient } from 'redis';


class RedisClient {
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on('error', (error) => {
      console.error(`Redis client has encountered an error: ${error}`);
      this.isClientConnected = false;
    });
    this.client.on('connect', () => {
      this.isClientConnected = true;
    });
  }

  
  isAlive() {
    return this.isClientConnected;
  }

  
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  
  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}


export const redisClient = new RedisClient();
export default redisClient;
