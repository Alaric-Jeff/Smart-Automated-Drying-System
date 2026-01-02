import type { FastifyInstance } from "fastify";
import { signUpRouter } from "./signup-router.js";
import { signInRouter } from "./signin-router.js";

/**
 * @description Routes registry for user component
 * @param fastify 
 */

export function userRoutes(
    fastify: FastifyInstance
){
    fastify.register(signUpRouter, {prefix: "/signup"})
    fastify.register(signInRouter, {prefix: "/signin"})
}