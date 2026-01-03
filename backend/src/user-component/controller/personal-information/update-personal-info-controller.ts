import type { FastifyRequest, FastifyReply } from "fastify";
import type { updatePersonalInformationType } from "../../schemas/personal-information-schema.js";
import { updatePersonalInformationService } from "../../service/personal-information/update-pers-info-service.js";

export async function updatePersonalInformationController(
  request: FastifyRequest<{ Body: updatePersonalInformationType }>,
  reply: FastifyReply
) {

  try {
    const uid = request.user!.uid;

    await updatePersonalInformationService(request.server, {
      ...request.body,
      uuid: uid
    });

    return reply.status(200).send({
      success: true,
      message: "User updated successfully"
    });

  } catch (err: unknown) {
    let message = "An unknown error occurred";
    let statusCode = 500;

    if (typeof err === "string") {
      message = err;

      switch (err) {
        case "UUID is required":
        case "No fields provided for update":
          statusCode = 400;
          break;

        case "User not found":
          statusCode = 404;
          break;

        case "Invalid contact number format. Use +639XXXXXXXXX":
          statusCode = 422;
          break;

        case "Insufficient permissions to update user":
          statusCode = 403;
          break;

        case "Firestore service unavailable":
          statusCode = 503;
          break;

        default:
          statusCode = 400;
      }
    }

    return reply.status(statusCode).send({
      success: false,
      message
    });
  }
}
