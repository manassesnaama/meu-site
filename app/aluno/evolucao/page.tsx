import { DashboardShell } from "@/components/DashboardShell";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const nav = [
  { href: "/aluno", label: "Dashboard" },
  { href: "/aluno/evolucao", label: "Evolucao fisica" },
  { href: "/aluno/pagamentos", label: "Pagamentos" },
  { href: "/aluno/perfil", label: "Perfil" }
];

export default async function EvolucaoPage() {
  const session = await auth();
  const student = await prisma.student.findUnique({
    where: { userId: session!.user.id },
    include: { evolutionPhotos: { orderBy: { takenAt: "desc" } } }
  });

  return (
    <DashboardShell role="Aluno" title="Evolucao fisica" nav={nav}>
      <section className="upload-panel">
        <div>
          <p className="eyebrow">Upload</p>
          <h2>Enviar nova foto</h2>
          <p>O envio das imagens sera ativado na etapa de armazenamento seguro.</p>
        </div>
        <button className="button primary" disabled>Selecionar foto</button>
      </section>
      <section className="cards three">
        {student?.evolutionPhotos.map((photo) => (
          <article className="card photo-card" key={photo.id}>
            <img className="photo-placeholder" src={photo.imageUrl} alt="Foto de evolucao" />
            <h3>{photo.note ?? "Registro de evolucao"}</h3>
            <p>{photo.takenAt.toLocaleDateString("pt-BR")}</p>
          </article>
        ))}
        {!student?.evolutionPhotos.length ? <p className="empty-state">Suas fotos de evolucao aparecerao aqui.</p> : null}
      </section>
    </DashboardShell>
  );
}
