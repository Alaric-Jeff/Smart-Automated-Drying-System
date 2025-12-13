// server.ts
import Fastify, { fastify } from "fastify";
import { dbPlug } from "./plugins/dbPlug.js";
import dotenv from "dotenv";

dotenv.config();

const server = Fastify({
  logger: true
});

server.register(dbPlug)

if (!process.env.HTTP_PORT || !process.env.HOST) {
  server.log.error("Missing required environment variables");
  server.close();
}

try {
  await server.listen({
    port: Number(process.env.HTTP_PORT),
    host: String(process.env.HOST)
  });
} catch (err) {
  server.log.error(`An error occurred: ${err}`);
  process.exit(1);
}