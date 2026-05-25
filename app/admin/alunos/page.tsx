import { DashboardShell } from "@/components/DashboardShell";
import { StudentTable } from "@/components/StudentTable";
import { prisma } from "@/lib/prisma";
import { getPaymentStatus, statusLabel } from "@/lib/status";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/alunos", label: "Alunos" },
  { href: "/admin/financeiro", label: "Financeiro" },
  { href: "/admin/cadastro", label: "Cadastro" },
  { href: "/admin/configuracoes", label: "Configuracoes" }
];

export default async function AlunosAdminPage() {
  const students = await prisma.student.findMany({
    include: { user: true, currentPlan: true },
    orderBy: { user: { name: "asc" } }
  });
  const rows = students.map((student) => {
    const status = getPaymentStatus(student.dueDate);
    return {
      id: student.id,
      name: student.user.name,
      plan: student.currentPlan?.name ?? "Sem plano",
      phone: student.phone,
      dueDate: student.dueDate.toLocaleDateString("pt-BR"),
      status,
      statusText: statusLabel(status)
    };
  });

  return (
    <DashboardShell role="Admin" title="Lista de alunos" nav={nav}>
      <StudentTable students={rows} />
    </DashboardShell>
  );
}
