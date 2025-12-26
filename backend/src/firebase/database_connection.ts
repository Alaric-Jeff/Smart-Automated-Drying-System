import admin from "firebase-admin";
import dotenv from "dotenv";
import type { FastifyInstance } from "fastify";

dotenv.config();

export function dbConnect(fastify: FastifyInstance) {
  try {
    if (!admin.apps.length) {
      fastify.log.info("Initializing Firebase Admin SDK…");

      // Log each env var (masking sensitive ones)
      fastify.log.info(`FIREBASE_TYPE: ${process.env.FIREBASE_TYPE}`);
      fastify.log.info(`FIREBASE_PROJECT_ID: ${process.env.FIREBASE_PROJECT_ID}`);
      fastify.log.info(`FIREBASE_PRIVATE_KEY_ID: ${process.env.FIREBASE_PRIVATE_KEY_ID}`);
      fastify.log.info(
        `FIREBASE_PRIVATE_KEY (first 50 chars): ${process.env.FIREBASE_PRIVATE_KEY?.slice(0, 50)}…`
      );
      fastify.log.info(`FIREBASE_CLIENT_EMAIL: ${process.env.FIREBASE_CLIENT_EMAIL}`);
      fastify.log.info(`FIREBASE_CLIENT_ID: ${process.env.FIREBASE_CLIENT_ID}`);
      fastify.log.info(`FIREBASE_AUTH_URI: ${process.env.FIREBASE_AUTH_URI}`);
      fastify.log.info(`FIREBASE_TOKEN_URI: ${process.env.FIREBASE_TOKEN_URI}`);
      fastify.log.info(`FIREBASE_AUTH_PROVIDER_X509_CERT_URL: ${process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL}`);
      fastify.log.info(`FIREBASE_CLIENT_X509_CERT_URL: ${process.env.FIREBASE_CLIENT_X509_CERT_URL}`);

      const serviceAccount = {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
      };

      fastify.log.info("Service account object constructed:");
      fastify.log.info(JSON.stringify(serviceAccount, null, 2));

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      });

      fastify.log.info("Successfully connected to the database");
    }
  } catch (err) {
    fastify.log.error("An error occurred in connecting to database:");
    fastify.log.error(err); 
    throw err;
  }

  const db = admin.firestore();

  fastify.log.info("Firestore instance created and decorated on fastify.db");

  fastify.get("/health", async (request, reply) => {
    fastify.log.info("Health check endpoint hit");
    try {
      const doc = await db.collection("_health").doc("ping").get();
      fastify.log.info(`Health check doc exists: ${doc.exists}`);
      return { status: "ok", exists: doc.exists };
    } catch (err) {
      fastify.log.error("Health check failed with error:");
      fastify.log.error(err); 
      reply.status(500).send({ status: "error", message: "Database not reachable" });
    }
  });

  return db;
}