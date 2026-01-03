import type { FastifyRequest, FastifyReply } from "fastify";
import type { ssoSignUpType } from "../../schemas/create-user-schema-req.js";
import { ssoSignUpService } from "../../service/sign-up/sso-signup-service.js";

export async function ssoSignUpController(
  request: FastifyRequest<{ Body: ssoSignUpType }>,
  reply: FastifyReply
) {
  try {
    const res = await ssoSignUpService(request.server, request.body);
    return reply.code(201).send(res); 
  } catch (err: unknown) {
    if (typeof err === "string") {
      switch (err) {
        case "User already exists":
          return reply.code(409).send({ error: err });
        case "Invalid sign-in provider":
          return reply.code(400).send({ error: err });
        case "Permission denied to create user":
          return reply.code(403).send({ error: err });
        case "Invalid arguments provided":
          return reply.code(400).send({ error: err });
        case "Internal server error":
          return reply.code(500).send({ error: err });
        case "Unknown error":
          return reply.code(500).send({ error: err });
        default:
          return reply.code(500).send({ error: "Unexpected error" });
      }
    } else if (err instanceof Error) {
      request.server.log.error(err);
      return reply.code(500).send({ error: "Unexpected error" });
    } else {
      request.server.log.error(`Unknown error type: ${err}`);
      return reply.code(500).send({ error: "Unknown error" });
    }
  }
}