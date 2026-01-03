import type { FastifyRequest, FastifyReply } from "fastify";
import type { changePasswordType } from "../../schemas/personal-information-schema.js";
import { updatePasswordService } from "../../service/personal-information/update-password-service.js";

export async function updatePasswordController(
  request: FastifyRequest<{ Body: changePasswordType }>,
  reply: FastifyReply
) {
  try {
    const uid = request.user!.uid;
    const bodyWithUid = { ...request.body, uuid: uid };

    await updatePasswordService(request.server, bodyWithUid);

    return reply.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err: unknown) {
    let message = "An unknown error occurred";
    let statusCode = 500;

    if (typeof err === "string") {
      message = err;

      switch (err) {
        case "User not found":
        case "User password not set":
          statusCode = 404;
          break;
        case "Current password is incorrect":
          statusCode = 401;
          break;
        case "Insufficient permissions to update password":
          statusCode = 403;
          break;
        case "Firestore service unavailable":
          statusCode = 503;
          break;
        case "Failed to update password":
          statusCode = 500;
          break;
        default:
          statusCode = 400;
      }
    } else if (err instanceof Error) {
      message = err.message;
      statusCode = 500;
    }

    return reply.status(statusCode).send({ success: false, message });
  }
}
