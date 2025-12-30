import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";

export default fp(async function firestorePlug(fastify: FastifyInstance) {
  if (!fastify.firebaseAdmin) {
    throw new Error("Firebase Admin not initialized!");
  }

  const db = fastify.firebaseAdmin.firestore();
  fastify.decorate("db", db);

  fastify.log.info("Firestore instance initialized and decorated on fastify.db");
});
