import Fastify from "fastify";
import firebaseAdminPlug from "./plugins/firebase-admin-plug.js";
import firestorePlug from "./plugins/firestore-plug.js";
import firebaseAuthPlug from "./plugins/firebase-auth-plug.js";
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { healthRoutes } from "./healthCheck.js";

const server = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

if (!process.env.HTTP_PORT || !process.env.HOST) {
  server.log.error("Missing required environment variables");
  console.log(String(process.env.HTTP_PORT))
  console.log(String(process.env.HOST))
  process.exit(1);
}

await server.register(firebaseAdminPlug);
await server.register(firestorePlug);
await server.register(firebaseAuthPlug)
await server.register(healthRoutes);

try {
  await server.listen({
    port: Number(process.env.HTTP_PORT),
    host: process.env.HOST,
  });
  server.log.info(`Server running at http://${process.env.HOST}:${process.env.HTTP_PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
} 
