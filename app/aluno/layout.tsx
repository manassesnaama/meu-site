import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AlunoLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.mustChangePassword) {
    redirect("/trocar-senha");
  }

  if (session.user.role !== "STUDENT") {
    redirect("/admin");
  }

  return children;
}
