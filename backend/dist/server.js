import Fastify from "fastify";
import firebaseAdminPlug from "./plugins/firebase-admin-plug.js";
import firestorePlug from "./plugins/firestore-plug.js";
import firebaseAuthPlug from "./plugins/firebase-auth-plug.js";
import { userRoutes } from "./user-component/router/index.js";
import { healthRoutes } from "./healthCheck.js";
import cors from '@fastify/cors';
import bcryptPlugin from "./plugins/bcrypt-plugin.js";
const server = Fastify({ logger: true }).withTypeProvider();
if (!process.env.HTTP_PORT || !process.env.HOST) {
    server.log.error("Missing required environment variables");
    console.log(String(process.env.HTTP_PORT));
    console.log(String(process.env.HOST));
    process.exit(1);
}
await server.register(cors, {
    origin: [
        "http://localhost:59242",
        "http://localhost:3000",
        "http://localhost:62863",
        "http://localhost:56498",
        "http://localhost:63266",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});
await server.register(firebaseAdminPlug);
await server.register(firestorePlug);
// await server.register(firebaseAuthPlug)
await server.register(healthRoutes);
await server.register(bcryptPlugin);
server.register(userRoutes, { prefix: "/user" });
try {
    await server.listen({
        port: Number(process.env.HTTP_PORT),
        host: process.env.HOST,
    });
    server.log.info(`Server running at http://${process.env.HOST}:${process.env.HTTP_PORT}`);
}
catch (err) {
    server.log.error(err);
    process.exit(1);
}
//# sourceMappingURL=server.js.map