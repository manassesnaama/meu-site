import { PublicPage } from "@/components/PublicPage";
import { LoginForm } from "@/components/LoginForm";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ senha?: string }> }) {
  const params = await searchParams;

  return (
    <PublicPage>
      <main className="login-page">
        <section className="login-card">
          <p className="eyebrow">Acesso restrito</p>
          <h1>Area do aluno</h1>
          {params.senha === "alterada" ? <p className="form-success">Senha alterada. Entre novamente com sua nova senha.</p> : null}
          <LoginForm />
          <p>O sistema identifica automaticamente se o acesso e de aluno, professor ou administracao.</p>
        </section>
      </main>
    </PublicPage>
  );
}
