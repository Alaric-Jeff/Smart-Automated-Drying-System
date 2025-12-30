import type { FastifyInstance } from "fastify";
import admin from "firebase-admin";

export async function healthRoutes(server: FastifyInstance) {
  server.get("/health", async (_req, reply) => {
    try {
      const db = admin.firestore();

      // lightweight Firestore ping
      await db.collection("health").doc("ping").get();
      const collections = await db.listCollections();
      console.log("Top-level collections:", collections.map(c => c.id));

      return {
        status: "ok",
        firestore: "connected",
      };
    } catch (err) {
      server.log.error(err);
      reply.status(500);
      return {
        status: "error",
        firestore: "disconnected",
      };
    }
  });
}
