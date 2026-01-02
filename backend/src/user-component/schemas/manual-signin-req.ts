import { Type, type Static } from "@sinclair/typebox";

export const manualSignInReqSchema = Type.Object({
    email: Type.String({
        format: "email"
    }),
    password: Type.String()
})

export type manualSignInType = Static<typeof manualSignInReqSchema>