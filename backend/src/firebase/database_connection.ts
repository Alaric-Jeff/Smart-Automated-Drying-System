import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";
import { createRequire } from "module";
import type { FastifyInstance } from "fastify";

dotenv.config();

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
if (!credPath) {
  throw new Error("Missing firebase credentials");
}

const require = createRequire(import.meta.url);

export function dbConnect(fastify: FastifyInstance) {
  try {
    if (!admin.apps.length) {
      const serviceAccount = require(path.resolve(credPath));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      fastify.log.info("Successfully connected to the database");
    }
  } catch (err) {
    fastify.log.error(`An error occurred in connecting to database: ${err}`);
    throw err;
  }

  const db = admin.firestore();
  return db;
}