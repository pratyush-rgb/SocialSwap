import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";

const envPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  ".env"
);

dotenv.config({ path: envPath });

let cachedConnection = global.mongooseConnection || null;
let memoryServer = global.mongoMemoryServer || null;

export const connectMongo = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (mongoUri) {
    try {
      cachedConnection = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });

      if (process.env.NODE_ENV !== "production") {
        global.mongooseConnection = cachedConnection;
      }

      return cachedConnection;
    } catch (error) {
      console.warn(
        `Failed to connect to ${mongoUri}. Falling back to an in-memory MongoDB instance.`
      );
      console.warn(error.message);
    }
  }

  memoryServer = await MongoMemoryServer.create();
  const memoryUri = memoryServer.getUri("socialswap");

  cachedConnection = await mongoose.connect(memoryUri);

  if (process.env.NODE_ENV !== "production") {
    global.mongooseConnection = cachedConnection;
    global.mongoMemoryServer = memoryServer;
  }

  return cachedConnection;
};

export default mongoose;
