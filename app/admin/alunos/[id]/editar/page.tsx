import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { StudentPhotoInput } from "@/components/StudentPhotoInput";
import { prisma } from "@/lib/prisma";
import { updateStudent } from "../../actions";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/alunos", label: "Alunos" },
  { href: "/admin/financeiro", label: "Financeiro" },
  { href: "/admin/cadastro", label: "Cadastro" },
  { href: "/admin/configuracoes", label: "Configuracoes" }
];

export default async function EditarAlunoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [student, plans] = await Promise.all([
    prisma.student.findUnique({ where: { id }, include: { user: true } }),
    prisma.plan.findMany({ orderBy: { price: "asc" } })
  ]);

  if (!student) notFound();

  return (
    <DashboardShell role="Admin" title={`Editar ${student.user.name}`} nav={nav}>
      <form className="form-card wide grid-form" action={updateStudent}>
        <input name="studentId" type="hidden" value={student.id} />
        <h2 className="form-section-title">Dados pessoais</h2>
        <label>Nome<input name="name" defaultValue={student.user.name} required /></label>
        <label>Telefone<input name="phone" defaultValue={student.phone} required /></label>
        <label className="form-span">Endereco<input name="address" defaultValue={student.address ?? ""} required /></label>
        <label>Idade<input name="age" type="number" min={3} max={100} defaultValue={student.age ?? ""} required /></label>
        <label>CPF opcional<input name="cpf" defaultValue={student.cpf ?? ""} /></label>
        <StudentPhotoInput initialPhoto={student.user.imageUrl} />
        <h2 className="form-section-title">Acesso e plano</h2>
        <label>Usuario de acesso<input name="username" defaultValue={student.user.username} required /></label>
        <label>Email opcional<input name="email" type="email" defaultValue={student.user.email ?? ""} /></label>
        <label>Nova senha opcional<input name="password" type="password" minLength={6} placeholder="Preencha somente para redefinir" /></label>
        <label>
          Plano
          <select name="planId" defaultValue={student.currentPlanId ?? ""} required>
            {plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
          </select>
        </label>
        <label>Data de vencimento<input name="dueDate" type="date" defaultValue={student.dueDate.toISOString().slice(0, 10)} required /></label>
        <h2 className="form-section-title">Saude e cuidados</h2>
        <label>
          Consta algum problema de saude?
          <select name="hasHealthIssue" required defaultValue={student.hasHealthIssue ? "yes" : "no"}>
            <option value="no">Nao</option>
            <option value="yes">Sim</option>
          </select>
        </label>
        <label className="form-span">Qual problema ou cuidado necessario?
          <textarea name="healthNotes" defaultValue={student.healthNotes ?? ""} />
        </label>
        <button className="button primary" type="submit">Salvar alteracoes</button>
      </form>
    </DashboardShell>
  );
}
