import { DashboardShell } from "@/components/DashboardShell";
import { MetricCard } from "@/components/MetricCard";
import { prisma } from "@/lib/prisma";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/alunos", label: "Alunos" },
  { href: "/admin/financeiro", label: "Financeiro" },
  { href: "/admin/cadastro", label: "Cadastro" },
  { href: "/admin/configuracoes", label: "Configuracoes" }
];

export default async function AdminPage() {
  const now = new Date();
  const inTenDays = new Date(now);
  inTenDays.setDate(inTenDays.getDate() + 10);
  const monthAgo = new Date(now);
  monthAgo.setDate(monthAgo.getDate() - 30);

  const [total, active, overdue, warning, newStudents] = await Promise.all([
    prisma.student.count(),
    prisma.student.count({ where: { active: true, dueDate: { gte: now } } }),
    prisma.student.count({ where: { dueDate: { lt: now } } }),
    prisma.student.count({ where: { dueDate: { gte: now, lte: inTenDays } } }),
    prisma.student.count({ where: { createdAt: { gte: monthAgo } } })
  ]);

  return (
    <DashboardShell role="Admin" title="Dashboard da academia" nav={nav}>
      <section className="metrics">
        <MetricCard label="Total de alunos" value={String(total)} />
        <MetricCard label="Alunos ativos" value={String(active)} tone="green" />
        <MetricCard label="Inadimplentes" value={String(overdue)} tone="red" />
        <MetricCard label="Vencendo em 10 dias" value={String(warning)} />
      </section>
      <section className="dashboard-grid">
        <article className="panel">
          <h2>Regra de inatividade</h2>
          <p>Ativo com mensalidade em dia. Alerta faltando 10 dias ou menos. Inativo quando vencido ha 30 dias ou mais.</p>
        </article>
        <article className="panel">
          <h2>Novos alunos</h2>
          <p><strong>{newStudents}</strong> cadastros nos ultimos 30 dias.</p>
        </article>
      </section>
    </DashboardShell>
  );
}
