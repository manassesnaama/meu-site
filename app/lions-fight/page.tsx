import { PublicPage } from "@/components/PublicPage";
import { whatsappHref } from "@/lib/whatsapp";

const upcoming = [
  "Historia do evento",
  "Galeria de fotos e videos",
  "Campeoes e destaques",
  "Proximas edicoes",
  "Area de inscricoes"
];

export default function LionsFightPage() {
  return (
    <PublicPage>
      <main className="page-top">
        <section className="lions-construction">
          <div>
            <p className="eyebrow">Evento especial da academia</p>
            <h1>Lions Fight</h1>
            <span className="construction-badge">Pagina em construcao</span>
            <p className="lead">
              Estamos preparando uma area exclusiva para o campeonato da Tidi Thai Team,
              com memoria do evento, atletas, campeoes, fotos, videos e futuras inscricoes.
            </p>
            <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">
              Receber informacoes
            </a>
          </div>
          <div className="construction-panel">
            <strong>Em breve</strong>
            <ul>
              {upcoming.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="cards three">
            <article className="card">
              <h3>Campeonato</h3>
              <p>Uma pagina dedicada para apresentar a historia e a identidade do Lions Fight.</p>
            </article>
            <article className="card">
              <h3>Atletas</h3>
              <p>Espaco para registrar campeoes, destaques, resultados e momentos importantes.</p>
            </article>
            <article className="card">
              <h3>Inscricoes</h3>
              <p>Area preparada para receber inscricoes futuramente, conectada a organizacao da academia.</p>
            </article>
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
