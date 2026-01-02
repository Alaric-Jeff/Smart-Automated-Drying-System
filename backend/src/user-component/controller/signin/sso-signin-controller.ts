import type { FastifyRequest, FastifyReply } from "fastify";
import { verifyIdToken } from "../../service/sign-in/sso-signin-service.js";

export async function verifyIdController(
  request: FastifyRequest<{ Body: { token: string } }>,
  reply: FastifyReply
) {
  const { token } = request.body;

  if (!token) {
    reply.code(400).send({ error: "Token is required" });
    return;
  }

  try {
    const decodedToken = await verifyIdToken(request.server, token);

    reply.code(200).send({ success: true, user: decodedToken });
  } catch (err: unknown) {
    switch (err) {
      case "TOKEN_EXPIRED":
      case "INVALID_TOKEN":
        reply.code(401).send({ error: err });
        break;
      case "USER_DISABLED":
        reply.code(403).send({ error: err });
        break;
      case "USER_NOT_FOUND":
        reply.code(404).send({ error: err });
        break;
      case "INVALID_ARGUMENT":
        reply.code(400).send({ error: err });
        break;
      case "INTERNAL_SERVER_ERROR":
        reply.code(500).send({ error: err });
        break;
      case "UNKNOWN_ERROR":
      default:
        request.server.log.error(`Unhandled verifyIdController error: ${err}`);
        reply.code(500).send({ error: "Unknown error occurred" });
    }
  }
}
