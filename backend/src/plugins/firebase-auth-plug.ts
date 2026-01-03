import fp from "fastify-plugin";
import type { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";

declare module "fastify" {
  interface FastifyRequest {
    user: admin.auth.DecodedIdToken | null;
  }
}

export async function firebaseAuthPreHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const auth = req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    reply.code(401).send({ error: "AUTH_MISSING" });
    return;
  }

  try {
    req.user = await admin.auth().verifyIdToken(auth.slice(7));
  } catch {
    reply.code(401).send({ error: "AUTH_INVALID" });
  }
}

export default fp(async (fastify) => {
  fastify.decorateRequest("user", null);
});
