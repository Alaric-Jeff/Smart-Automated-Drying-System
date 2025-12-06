import Fastify from 'fastify';
import dotenv from 'dotenv';
dotenv.config();
const server = Fastify({
    logger: true
});
if (!process.env.HTTP_PORT || !process.env.HOST) {
    server.log.error("Missing required environment variables");
    server.close();
}
try {
    server.listen({
        port: Number(process.env.HTTP_PORT),
        host: String(process.env.HOST)
    });
}
catch (err) {
    server.log.error("An error occured");
}
//# sourceMappingURL=server.js.map