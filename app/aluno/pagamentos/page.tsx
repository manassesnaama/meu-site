import { DashboardShell } from "@/components/DashboardShell";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const nav = [
  { href: "/aluno", label: "Dashboard" },
  { href: "/aluno/evolucao", label: "Evolucao fisica" },
  { href: "/aluno/pagamentos", label: "Pagamentos" },
  { href: "/aluno/perfil", label: "Perfil" }
];

function currency(value: { toString(): string }) {
  return Number(value.toString()).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function PagamentosAlunoPage() {
  const session = await auth();
  const student = await prisma.student.findUnique({
    where: { userId: session!.user.id },
    include: { payments: { orderBy: { paidAt: "desc" } } }
  });

  return (
    <DashboardShell role="Aluno" title="Historico de pagamentos" nav={nav}>
      <section className="table-panel">
        <table>
          <thead><tr><th>Data</th><th>Valor</th><th>Forma</th><th>Proximo vencimento</th></tr></thead>
          <tbody>
            {student?.payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.paidAt.toLocaleDateString("pt-BR")}</td>
                <td>{currency(payment.amount)}</td>
                <td>{payment.method ?? "-"}</td>
                <td>{payment.nextDue.toLocaleDateString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!student?.payments.length ? <p className="empty-state">Nenhum pagamento registrado ainda.</p> : null}
      </section>
    </DashboardShell>
  );
}
