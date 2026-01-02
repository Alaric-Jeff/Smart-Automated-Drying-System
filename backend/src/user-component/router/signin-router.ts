import type { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import { verifyIdController } from "../controller/signin/sso-signin-controller.js";
import { manualSignInReqSchema } from "../schemas/manual-signin-req.js";
import { manualSignInController } from "../controller/signin/manual-signin-controller.js";

export async function signInRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/sso",
    schema: {
      body: Type.Object({
        token: Type.String({ minLength: 1 }) 
      }),
      response: {
        200: Type.Object({
          success: Type.Boolean(),
          user: Type.Any(),
        }),
        400: Type.Object({ error: Type.String() }),
        401: Type.Object({ error: Type.String() }),
        403: Type.Object({ error: Type.String() }),
        404: Type.Object({ error: Type.String() }),
        500: Type.Object({ error: Type.String() }),
      },
    },
    handler: verifyIdController,
  });


  fastify.route({
    method: 'POST',
    url: '/manual',
    schema: {
      body: manualSignInReqSchema
    }, handler: manualSignInController
  })
}
