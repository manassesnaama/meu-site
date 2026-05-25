import { DashboardShell } from "@/components/DashboardShell";
import { prisma } from "@/lib/prisma";
import { createStudent } from "./actions";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/alunos", label: "Alunos" },
  { href: "/admin/financeiro", label: "Financeiro" },
  { href: "/admin/cadastro", label: "Cadastro" },
  { href: "/admin/configuracoes", label: "Configuracoes" }
];

export default async function CadastroPage() {
  const plans = await prisma.plan.findMany({ orderBy: { price: "asc" } });

  return (
    <DashboardShell role="Admin" title="Cadastrar novo aluno" nav={nav}>
      <form className="form-card wide grid-form" action={createStudent}>
        <h2 className="form-section-title">Dados pessoais</h2>
        <label>Nome<input name="name" placeholder="Nome completo" required /></label>
        <label>Telefone<input name="phone" placeholder="WhatsApp" required /></label>
        <label className="form-span">Endereco<input name="address" placeholder="Rua, numero, bairro e cidade" required /></label>
        <label>Idade<input name="age" type="number" min={3} max={100} placeholder="Idade do aluno" required /></label>
        <label>CPF opcional<input name="cpf" placeholder="000.000.000-00" /></label>
        <h2 className="form-section-title">Acesso e plano</h2>
        <label>Usuario de acesso<input name="username" placeholder="ex: joao.silva" required /></label>
        <label>Email opcional<input name="email" type="email" placeholder="email@exemplo.com" /></label>
        <label>Senha inicial<input name="password" type="password" minLength={6} required /></label>
        <label>
          Plano
          <select name="planId" required>
            {plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}
          </select>
        </label>
        <label>Data de vencimento<input name="dueDate" type="date" required /></label>
        <label>Foto<input name="photo" type="file" disabled /></label>
        <h2 className="form-section-title">Saude e cuidados</h2>
        <label>
          Consta algum problema de saude?
          <select name="hasHealthIssue" required defaultValue="no">
            <option value="no">Nao</option>
            <option value="yes">Sim</option>
          </select>
        </label>
        <label className="form-span">Qual problema ou cuidado necessario?
          <textarea name="healthNotes" placeholder="Preencher apenas se houver alguma condicao, lesao ou recomendacao medica." />
        </label>
        <button className="button primary" type="submit">Criar aluno</button>
      </form>
    </DashboardShell>
  );
}
