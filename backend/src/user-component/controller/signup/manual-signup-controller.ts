import type { FastifyRequest, FastifyReply } from "fastify";
import type { manualSignUpType } from "../../schemas/create-user-schema-req.js";
import { manualSignUpService } from "../../service/sign-up/manual-signup-service.js";

export async function manualSignUpController(
  request: FastifyRequest<{ Body: manualSignUpType }>,
  reply: FastifyReply
) {
  const { uuid, firstName, lastName, email, password } = request.body;

  try {
    await manualSignUpService(request.server, {
      uuid,
      firstName,
      lastName,
      email,
      password
    });

    return reply.code(201).send({
      message: "Sign up successful"
    });
  } catch (err) {
    switch (err) {
      case "User already exists":
        return reply.code(409).send({ message: "User already exists" });
      case "Permission denied to create user":
        return reply.code(403).send({ message: "Permission denied" });
      case "Invalid arguments provided":
        return reply.code(400).send({ message: "Invalid arguments" });
      case "Internal server error":
        return reply.code(500).send({ message: "Internal server error" });
      case "Unknown error":
        return reply.code(500).send({ message: "Unknown error" });
      default:
        request.server.log.error(`Unhandled error: ${err}`);
        return reply.code(500).send({ message: "Unexpected error" });
    }
  }
}