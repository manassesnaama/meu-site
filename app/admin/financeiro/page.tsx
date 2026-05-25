import { DashboardShell } from "@/components/DashboardShell";
import { FinancialStudents } from "@/components/FinancialStudents";
import { prisma } from "@/lib/prisma";
import { getPaymentStatus, statusLabel } from "@/lib/status";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/alunos", label: "Alunos" },
  { href: "/admin/financeiro", label: "Financeiro" },
  { href: "/admin/cadastro", label: "Cadastro" },
  { href: "/admin/configuracoes", label: "Configuracoes" }
];

function currency(value: { toString(): string }) {
  return Number(value.toString()).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function FinanceiroPage() {
  const [students, payments] = await Promise.all([
    prisma.student.findMany({ include: { user: true, currentPlan: true }, orderBy: { dueDate: "asc" } }),
    prisma.payment.findMany({
      include: { student: { include: { user: true } } },
      orderBy: { paidAt: "desc" },
      take: 30
    })
  ]);
  const financialStudents = students.map((student) => {
    const status = getPaymentStatus(student.dueDate);
    return {
      id: student.id,
      name: student.user.name,
      plan: student.currentPlan?.name ?? "Sem plano",
      dueDate: student.dueDate.toLocaleDateString("pt-BR"),
      status,
      statusText: statusLabel(status),
      canPay: Boolean(student.currentPlan)
    };
  });
  const financialPayments = payments.map((payment) => ({
    id: payment.id,
    studentName: payment.student.user.name,
    amount: currency(payment.amount),
    paidAt: payment.paidAt.toLocaleDateString("pt-BR"),
    method: payment.method ?? "-",
    nextDue: payment.nextDue.toLocaleDateString("pt-BR")
  }));

  return (
    <DashboardShell role="Admin" title="Controle financeiro" nav={nav}>
      <FinancialStudents students={financialStudents} payments={financialPayments} />
    </DashboardShell>
  );
}
