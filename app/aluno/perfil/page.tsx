import { DashboardShell } from "@/components/DashboardShell";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const nav = [
  { href: "/aluno", label: "Dashboard" },
  { href: "/aluno/evolucao", label: "Evolucao fisica" },
  { href: "/aluno/pagamentos", label: "Pagamentos" },
  { href: "/aluno/perfil", label: "Perfil" }
];

export default async function PerfilAlunoPage() {
  const session = await auth();
  const student = await prisma.student.findUnique({
    where: { userId: session!.user.id },
    include: { user: true, currentPlan: true }
  });

  return (
    <DashboardShell role="Aluno" title="Meu perfil" nav={nav}>
      {student ? (
        <section className="form-card wide">
          <label>Nome<input value={student.user.name} readOnly /></label>
          <label>Usuario<input value={student.user.username} readOnly /></label>
          <label>Email<input value={student.user.email ?? ""} readOnly /></label>
          <label>Telefone<input value={student.phone} readOnly /></label>
          <label>Plano<input value={student.currentPlan?.name ?? "Sem plano"} readOnly /></label>
        </section>
      ) : (
        <section className="panel"><p>Cadastro de aluno nao localizado.</p></section>
      )}
    </DashboardShell>
  );
}
