"use server";

import { hash } from "bcryptjs";
import { signOut, auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function changeInitialPassword(
  _: string | undefined,
  formData: FormData
) {
  const session = await auth();

  if (!session?.user) {
    return "Sua sessao expirou. Entre novamente.";
  }

  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (password.length < 8) {
    return "A nova senha precisa ter pelo menos 8 caracteres.";
  }

  if (password !== confirmation) {
    return "As senhas nao conferem.";
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      passwordHash: await hash(password, 12),
      mustChangePassword: false
    }
  });

  await signOut({ redirectTo: "/login?senha=alterada" });
}
