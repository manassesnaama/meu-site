import { DashboardShell } from "@/components/DashboardShell";
import { MetricCard } from "@/components/MetricCard";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getPaymentStatus, statusLabel } from "@/lib/status";

const nav = [
  { href: "/aluno", label: "Dashboard" },
  { href: "/aluno/evolucao", label: "Evolucao fisica" },
  { href: "/aluno/pagamentos", label: "Pagamentos" },
  { href: "/aluno/perfil", label: "Perfil" }
];

export default async function AlunoPage() {
  const session = await auth();
  const [student, notices] = await Promise.all([
    prisma.student.findUnique({
      where: { userId: session!.user.id },
      include: { user: true, currentPlan: true }
    }),
    prisma.notice.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 4 })
  ]);

  if (!student) {
    return (
      <DashboardShell role="Aluno" title="Meu painel" nav={nav}>
        <section className="panel"><p>Seu cadastro de aluno ainda nao foi vinculado. Fale com a academia.</p></section>
      </DashboardShell>
    );
  }

  const status = getPaymentStatus(student.dueDate);

  return (
    <DashboardShell role="Aluno" title={`Ola, ${student.user.name}`} nav={nav}>
      <section className="metrics">
        <MetricCard label="Plano atual" value={student.currentPlan?.name ?? "Sem plano"} />
        <MetricCard label="Vencimento" value={student.dueDate.toLocaleDateString("pt-BR")} tone={status === "paid" ? "green" : "red"} />
        <MetricCard label="Status" value={statusLabel(status)} tone={status === "paid" ? "green" : "red"} />
      </section>
      <section className="dashboard-grid">
        <article className="panel">
          <h2>Mensalidade</h2>
          <p>Quando o professor registrar seu pagamento, o proximo vencimento e atualizado automaticamente para mais 30 dias.</p>
        </article>
        <article className="panel">
          <h2>Avisos da academia</h2>
          {notices.length === 0 ? <p>Nenhum aviso publicado no momento.</p> : notices.map((notice) => <p key={notice.id}><strong>{notice.title}</strong><br />{notice.body}</p>)}
        </article>
      </section>
    </DashboardShell>
  );
}
