"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function authenticate(
  _: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/painel"
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Usuario ou senha incorretos.";
    }

    throw error;
  }
}
