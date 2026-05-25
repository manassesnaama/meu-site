import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PublicPage } from "@/components/PublicPage";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";

export default async function TrocarSenhaPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.mustChangePassword) {
    redirect("/painel");
  }

  return (
    <PublicPage>
      <main className="login-page">
        <section className="login-card">
          <p className="eyebrow">Primeiro acesso</p>
          <h1>Crie sua senha</h1>
          <p>Antes de acessar o painel, substitua a senha temporaria por uma senha pessoal.</p>
          <ChangePasswordForm />
        </section>
      </main>
    </PublicPage>
  );
}
