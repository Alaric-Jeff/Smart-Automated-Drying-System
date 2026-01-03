import type { FastifyInstance } from "fastify";
import type { changePasswordType } from "../../schemas/personal-information-schema.js";

export async function updatePasswordService(
  fastify: FastifyInstance,
  body: changePasswordType
) {
  const { uuid, currentPassword, newPassword } = body;

  try {
    const userDocRef = fastify.db.collection("user").doc(uuid);
    const snapshot = await userDocRef.get();

    if (!snapshot.exists) {
      throw "User not found";
    }

    const userData = snapshot.data();

    if (!userData?.password) {
      throw "User password not set";
    }

    const isMatch = await fastify.bcrypt.compare(
      currentPassword,
      userData.password
    );

    if (!isMatch) {
      throw "Current password is incorrect";
    }

    const hashedPassword = await fastify.bcrypt.hash(newPassword);

    await userDocRef.update({
      password: hashedPassword,
      updatedAt: new Date(),
    });

    return true;
  } catch (err: unknown) {
    if (typeof err === "string") {
      throw err;
    }
    if (err instanceof Error) {
      if (err.message.includes("permission-denied")) {
        throw "Insufficient permissions to update password";
      }

      if (err.message.includes("unavailable")) {
        throw "Firestore service unavailable";
      }

      throw "Failed to update password";
    }

    throw "Unknown error occurred while updating password";
  }
}
