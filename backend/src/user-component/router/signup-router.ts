import type { FastifyInstance } from "fastify";
import { manualSignUpController } from "../controller/signup/manual-signup-controller.js";
import { manualSignUpSchema } from "../schemas/create-user-schema-req.js";
import { ssoSignUpController } from "../controller/signup/sso-signup-controller.js";
import { ssoSignUpSchema } from "../schemas/create-user-schema-req.js";

export function signUpRouter(
    fastify: FastifyInstance
){
    /**
     * @description Router for manual sign-up
     */
    fastify.route({
        method: 'POST',
        url: "/manual",
        schema: {
            body: manualSignUpSchema
        }, handler: manualSignUpController
    });

    /**
     * @description Router for sso sign-up
     */

    fastify.route({
        method: "POST",
        url: "/sso",
        schema: {
            body: ssoSignUpSchema
        }, handler: ssoSignUpController
    })
}