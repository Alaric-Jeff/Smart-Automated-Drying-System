import type { FastifyInstance } from "fastify";
import type { ssoSignUpType } from "../../schemas/create-user-schema-req.js";
import { Timestamp } from "firebase-admin/firestore";

export async function ssoSignUpService(
  fastify: FastifyInstance,
  body: ssoSignUpType
) {
  const {
    uuid,
    displayName,
    signInProvider,
    photoUrl
  } = body;

  try {
    const userCollection = fastify.db.collection("users");

    const existingUser = await userCollection.doc(uuid).get();
    if (existingUser.exists) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    if (!["google.com", "facebook.com"].includes(signInProvider)) {
      throw new Error("INVALID_PROVIDER");
    }

    await userCollection.doc(uuid).set({
      uuid,
      displayName,
      firstName: "", 
      lastName: "", 
      email: null,   
      password: null,
      signInProvider,
      photoUrl: photoUrl ?? null,
      address: null,
      contactNumber: null,
      devices: [],
       createdAt: Timestamp.now()
    });

    return { success: true, message: "USER_CREATED" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      switch (err.message) {
        case "USER_ALREADY_EXISTS":
          throw "User already exists";
        case "INVALID_PROVIDER":
          throw "Invalid sign-in provider";
        case "PERMISSION_DENIED":
          throw "Permission denied to create user";
        case "INVALID_ARGUMENT":
          throw "Invalid arguments provided";
        default:
          fastify.log.error(`Unexpected error: ${err.message}`);
          throw "Internal server error";
      }
    } else {
      fastify.log.error(`An unknown error occurred: ${err}`);
      throw "Unknown error";
    }
  }
}