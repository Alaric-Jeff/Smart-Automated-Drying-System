import { Type, type Static } from "@sinclair/typebox";


/**
 * @description Supported sign in providers 
 */
export enum SignInProviders {
  Google = "google.com",
  Facebook = "facebook.com"
}


/**
 * @description Typebox schema for manual sign-up request
 */
export const manualSignUpSchema = Type.Object({
  uuid: Type.String(),
  firstName: Type.String({
    minLength: 3,
    maxLength: 27,
    pattern: "^[A-Za-z]+$"
  }),
  lastName: Type.String({
    minLength: 3,
    maxLength: 27,
    pattern: "^[A-Za-z]+$"
  }),
  email: Type.String({
    format: "email"
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 50,
    pattern: "^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$"
  })
});

/**
 * @description Typebox schema for sso sign-up request
 */
export type manualSignUpType = Static<typeof manualSignUpSchema>;

export const ssoSignUpSchema = Type.Object({
  uuid: Type.String(),
  displayName: Type.String(),
  signInProvider: Type.Enum(SignInProviders),
  photoUrl: Type.Optional(Type.String())
});

export type ssoSignUpType = Static<typeof ssoSignUpSchema>;
