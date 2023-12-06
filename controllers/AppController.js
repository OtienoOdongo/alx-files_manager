import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const getStatus = (request, response) => {
  response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
};

const getStats = async (request, response) => {
  response.status(200).json({ users: await dbClient.nbUsers(), files: await dbClient.nbFiles() });
};

module.exports = { getStats, getStatus };
