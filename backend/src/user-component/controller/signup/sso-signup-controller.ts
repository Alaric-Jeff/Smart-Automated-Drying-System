import type { FastifyRequest, FastifyReply } from "fastify";
import type { ssoSignUpType } from "../../schemas/create-user-schema-req.js";

export async function ssoSignUpController(request: FastifyRequest<{Body:ssoSignUpType}>, reply: FastifyReply){

}