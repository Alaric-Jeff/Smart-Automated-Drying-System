import type { FastifyRequest, FastifyReply } from "fastify";
import type { manualSignInType } from "../../schemas/manual-signin-req.js";
import { manualSignInService } from "../../service/sign-in/manual-signin-service.js";

export async function manualSignInController(
  request: FastifyRequest<{ Body: manualSignInType }>,
  reply: FastifyReply
) {
  try {
    const result = await manualSignInService(request.server, request.body);

    return reply.code(200).send({
      success: true,
      message: result.message,
      customToken: result.customToken,
    });
  } catch (err: unknown) {
    if (typeof err === "string") {
      switch (err) {
        case "User does not exist":
          return reply.code(404).send({ success: false, message: err });
        case "Incorrect password":
          return reply.code(401).send({ success: false, message: err });
        case "Internal server error":
        case "Unknown error":
        default:
          return reply.code(500).send({ success: false, message: err });
      }
    }

    // Fallback for unexpected errors
    request.server.log.error(`Unhandled error in manualSignInController: ${err}`);
    return reply.code(500).send({ success: false, message: "Internal server error" });
  }
}
