import "fastify";
import type admin from "firebase-admin";
import type { Firestore } from "firebase-admin/firestore";

declare module "fastify" {
  interface FastifyInstance {
    firebaseAdmin: typeof admin;
    db: Firestore;
    user: {
      uid: string;
      email?: string;
      firebase: {
        sign_in_provider: string;
      };
    };
    bcrypt: {
      hash: (password: string, saltRounds?: number) => Promise<string>;
      compare: (password: string, hash: string) => Promise<boolean>;
    };
  }
}