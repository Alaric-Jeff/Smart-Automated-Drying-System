import type { FastifyInstance } from "fastify";
import type admin from "firebase-admin"; // for type only

/**
 * @description Verifies a Firebase ID token and returns the decoded token.
 * 
 */
export async function verifyIdToken(
  fastify: FastifyInstance,
  token: string
): Promise<admin.auth.DecodedIdToken> {  
  try {
    const decodedToken = await fastify.firebaseAdmin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (err: unknown) {
    if (err instanceof Error) {
      const message = (err as any).code as string | undefined;

      switch (message) {
        case "auth/id-token-expired":
          throw "TOKEN_EXPIRED";      
        case "auth/invalid-id-token":
          throw "INVALID_TOKEN";       
        case "auth/user-disabled":
          throw "USER_DISABLED";      
        case "auth/user-not-found":
          throw "USER_NOT_FOUND";     
        case "auth/argument-error":
          throw "INVALID_ARGUMENT";     
        default:
          fastify.log.error(`Unexpected token verification error: ${err.message}`);
          throw "INTERNAL_SERVER_ERROR";
      }
    } else {
      fastify.log.error(`Unknown error during token verification: ${err}`);
      throw "UNKNOWN_ERROR";           
    }
  }
}
