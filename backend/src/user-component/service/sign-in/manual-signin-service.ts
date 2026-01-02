import type { FastifyInstance } from "fastify";
import type { manualSignInType } from "../../schemas/manual-signin-req.js";

export async function manualSignInService(
  fastify: FastifyInstance,
  body: manualSignInType
) {
  const { email, password } = body;

  try { 
    const usersCollection = fastify.db.collection("users");

    const querySnapshot = await usersCollection.where("email", "==", email).get();

    if (querySnapshot.empty) {
      throw new Error("USER_DOES_NOT_EXIST");
    }

    const userDoc = querySnapshot.docs[0];
    if (!userDoc) {
      throw new Error("USER_DOES_NOT_EXIST");
    }
    const userData = userDoc.data();

    const passwordMatch = await fastify.bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      throw new Error("INVALID_PASSWORD");
    }

    const uid = userData.uuid;

    const customToken = await fastify.firebaseAdmin.auth().createCustomToken(uid, {
      email: userData.email,
      displayName: userData.displayName,
      signInProvider: "manual",
    });

    return {
      success: true,
      message: "SIGNIN_SUCCESS",
      customToken,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      switch (err.message) {
        case "USER_DOES_NOT_EXIST":
          throw "User does not exist"; 
        case "INVALID_PASSWORD":
          throw "Incorrect password"; 
        default:
          fastify.log.error(`Unexpected error: ${err.message}`);
          throw "Internal server error";
      }
    } else {
      fastify.log.error(`Unknown error: ${err}`);
      throw "Unknown error"; 
    }
  }
}
