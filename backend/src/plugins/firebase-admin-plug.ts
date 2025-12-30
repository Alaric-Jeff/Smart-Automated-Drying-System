import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { initFirebaseAdmin } from "../firebase/firebase-admin.js";

export default fp(async function firebaseAdminPlug(fastify: FastifyInstance) {
  fastify.decorate("firebaseAdmin", initFirebaseAdmin());
});
