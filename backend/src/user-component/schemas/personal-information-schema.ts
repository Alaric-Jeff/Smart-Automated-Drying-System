import { Type, type Static } from "@sinclair/typebox";

/**
 * @description Typebox for user's uid
 * 
 */

export const userIdSchema = Type.Object({
  uid: Type.String()
})

export type userIdType = Static<typeof userIdSchema>

/**
 * @description Typebox schema for editing profile informations
 */

export const updatePersonalInformationSchema = Type.Object({
  uuid: Type.String(),

  displayName: Type.Optional(
    Type.String({
      minLength: 3,
      maxLength: 25,
      // SSO-friendly: letters, numbers, space, dot, underscore, dash
      pattern: "^[A-Za-z0-9 ._-]+$"
    })
  ),

  firstName: Type.Optional(
    Type.String({
      minLength: 3,
      maxLength: 27,
      pattern: "^[A-Za-z]+$"
    })
  ),

  lastName: Type.Optional(
    Type.String({
      minLength: 3,
      maxLength: 27,
      pattern: "^[A-Za-z]+$"
    })
  ),

  contactNumber: Type.Optional(
    Type.String({
      // normalized PH mobile format: +639XXXXXXXXX
      pattern: "^\\+639\\d{9}$"
    })
  ),

  address: Type.Optional(
    Type.String({
      maxLength: 120
    })
  )
});

export type updatePersonalInformationType = Static<typeof updatePersonalInformationSchema>;


/**
 * @description Typebox schema for changing password
 */

export const changePasswordSchema = Type.Object({
  uuid: Type.String(),
  currentPassword: Type.String(),
  newPassword:  Type.String({
    minLength: 8,
    maxLength: 50,
    pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$"
  })
})

export type changePasswordType = Static<typeof changePasswordSchema>