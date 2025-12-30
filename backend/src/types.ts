import "fastify";
import type admin from "firebase-admin";
import type { Firestore } from "firebase-admin/firestore";

declare module "fastify" {
  interface FastifyInstance {
    firebaseAdmin: typeof admin;
    db: Firestore;
  }
}
