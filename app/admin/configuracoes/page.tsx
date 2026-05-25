import { DashboardShell } from "@/components/DashboardShell";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/alunos", label: "Alunos" },
  { href: "/admin/financeiro", label: "Financeiro" },
  { href: "/admin/cadastro", label: "Cadastro" },
  { href: "/admin/configuracoes", label: "Configurações" }
];

export default function ConfiguracoesPage() {
  return (
    <DashboardShell role="Admin" title="Configurações" nav={nav}>
      <section className="cards three">
        <article className="card"><h3>WhatsApp</h3><p>Número global usado em todas as páginas.</p></article>
        <article className="card"><h3>Upload</h3><p>Conectar Cloudinary ou UploadThing para fotos de evolução.</p></article>
        <article className="card"><h3>Seguranca</h3><p>Login protegido por senha criptografada e acesso separado por perfil.</p></article>
      </section>
    </DashboardShell>
  );
}
