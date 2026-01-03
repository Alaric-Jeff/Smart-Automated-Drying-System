import type { FastifyInstance } from "fastify";
import type { manualSignUpType } from "../../schemas/create-user-schema-req.js";
import { Timestamp } from "firebase-admin/firestore";

/**
 * Manual Sign-Up Service
 *
 * Handles creation of a new user account via manual email/password signup.
 * - Validates that the user does not already exist.
 * - Hashes the provided password using bcrypt.
 * - Persists the user document in Firestore under the "users" collection.
 * - Returns a success message or throws a string error for controller mapping.
 *
 * @param fastify - Fastify instance with decorated `db` (Firestore) and `bcrypt` plugin.
 * @param body - Manual signup request payload:
 *   {
 *     uuid: string,
 *     firstName: string,
 *     lastName: string,
 *     email: string,
 *     password: string
 *   }
 *
 * @returns Promise<{ success: boolean; message: string }> on success
 * @throws string error messages for known cases:
 *   - "User already exists" → conflict (409)
 *   - "Permission denied to create user" → forbidden (403)
 *   - "Invalid arguments provided" → bad request (400)
 *   - "Internal server error" → unexpected failure (500)
 *   - "Unknown error" → non-Error thrown
 */
export async function manualSignUpService(
  fastify: FastifyInstance,
  body: manualSignUpType
) {
  const { uuid, firstName, lastName, email, password } = body;

  try {
    const userCollection = fastify.db.collection("users");

    const existingUser = await userCollection.doc(uuid).get();
    if (existingUser.exists) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    const hashedPassword = await fastify.bcrypt.hash(password, 10);

    await userCollection.doc(uuid).set({
      uuid,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      displayName: `${firstName} ${lastName}`,
      signInProvider: "manual",
      photoUrl: null,
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