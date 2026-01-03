import type { FastifyInstance } from "fastify";
import { updatePersonalInformationSchema } from "../schemas/personal-information-schema.js";
import { updatePersonalInformationController } from "../controller/personal-information/update-personal-info-controller.js";
import { updatePasswordController } from "../controller/personal-information/update-password-controller.js";
import { changePasswordSchema } from "../schemas/personal-information-schema.js";
import { firebaseAuthPreHandler } from "../../plugins/firebase-auth-plug.js";

export async function personalInfoRoutes(
    fastify: FastifyInstance
){
    fastify.route({
        method: 'PATCH',
        url: '/patch-personal-info',
        schema: {
            body: updatePersonalInformationSchema
        },preHandler: firebaseAuthPreHandler,
        handler: updatePersonalInformationController
    })

      fastify.route({
        method: 'PUT',
        url: '/update-password',
        schema: {
            body: changePasswordSchema
        },preHandler: firebaseAuthPreHandler,
        handler: updatePasswordController
    })
}