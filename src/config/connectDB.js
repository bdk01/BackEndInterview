import "dotenv/config";
import mongoose from "mongoose";
import { sleep } from "../utils";
import logger from "../utils/logger";

const connect = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017';
   
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUri);
    logger.info('Connect to Mongo client successfully.');
  } catch (error) {
    logger.error('Fail to connect to mongo client because of: %s', error.stack);
    await sleep(3000);
    return await connect();
  }
}

export default connect;
