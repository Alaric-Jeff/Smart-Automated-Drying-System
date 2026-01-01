import fp from "fastify-plugin";
import type { FastifyReply } from "fastify";
import admin from "firebase-admin";

declare module "fastify" {
  interface FastifyRequest {
    user: admin.auth.DecodedIdToken | null;
  }
}

export default fp(async (fastify) => {
  fastify.decorateRequest("user", null);

  fastify.addHook("preHandler", async (req, reply: FastifyReply) => {
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer ")) {
      reply.code(401).send({ error: "Missing Authorization header" });
      return;
    }

    try {
      req.user = await admin.auth().verifyIdToken(auth.slice(7));
    } catch {
      reply.code(401).send({ error: "Invalid Firebase token" });
    }
  });
});
