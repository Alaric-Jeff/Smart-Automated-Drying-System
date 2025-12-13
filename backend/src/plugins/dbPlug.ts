import { dbConnect } from "../firebase/database_connection.js";
import type { FastifyInstance } from "fastify";

export async function dbPlug(fastify: FastifyInstance) {
  try {
    const db = dbConnect(fastify);
    fastify.decorate("db", db);

    fastify.log.info("Firestore has been decorated on fastify.db");
  } catch (err) {
    fastify.log.error(`Failed to connect Firestore: ${err}`);
    throw err;
  }
}