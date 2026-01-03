import type { FastifyInstance } from "fastify";
import type { updatePersonalInformationType } from "../../schemas/personal-information-schema.js";

/**
 * Update personal information for a user.
 * Only fields provided in the body will be updated.
 * Throws string errors for controller mapping.
 */
export async function updatePersonalInformationService(
  fastify: FastifyInstance,
  body: updatePersonalInformationType
) {
  const {
    uuid,
    displayName,
    firstName,
    lastName,
    contactNumber,
    address
  } = body;

  try {
    if (!uuid) {
      throw "UUID is required";
    }

    const userCollection = fastify.db.collection("user");
    const userDocRef = userCollection.doc(uuid);

    const snapshot = await userDocRef.get();
    if (!snapshot.exists) {
      throw "User not found";
    }
    const updateFields: Record<string, unknown> = {};

    if (displayName !== undefined) updateFields.displayName = displayName;
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (contactNumber !== undefined) {
      
      const normalized = contactNumber.replace(/\s|-/g, ""); 
      if (!/^\+639\d{9}$/.test(normalized)) {
        throw "Invalid contact number format. Use +639XXXXXXXXX";
      }
      updateFields.contactNumber = normalized;
    }
    if (address !== undefined) updateFields.address = address;

    if (Object.keys(updateFields).length === 0) {
      throw "No fields provided for update";
    }

    updateFields.updatedAt = new Date();
    await userDocRef.update(updateFields);

    return true;
  } catch (err: unknown) {
    if (typeof err === "string") {
      throw err;
    } else if (err instanceof Error) {
      if (err.message.includes("permission-denied")) {
        throw "Insufficient permissions to update user";
      }
      if (err.message.includes("unavailable")) {
        throw "Firestore service unavailable";
      }
      throw err.message; 
    } else {
      throw "Unknown error occurred while updating user";
    }
  }
}
