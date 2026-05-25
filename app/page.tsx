import Link from "next/link";
import { PublicPage } from "@/components/PublicPage";
import { disciplines, plans, schedules } from "@/lib/data";
import { whatsappHref } from "@/lib/whatsapp";

const trainingVideos = [
  {
    title: "Técnica real",
    src: "/assets/videos/tecnica-real.mp4",
    poster: "/assets/home/ring-action.jpg"
  },
  {
    title: "Condicionamento",
    src: "/assets/videos/condicionamento.mp4",
    poster: "/assets/home/fight-night.jpg"
  },
  {
    title: "Comunidade",
    src: "/assets/videos/tecnica-real.mp4",
    poster: "/assets/home/coach-work.jpg"
  }
];

export default function HomePage() {
  return (
    <PublicPage>
      <main>
        <section className="hero">
          <div className="hero-media" />
          <div className="hero-content">
            <p className="eyebrow">Muay Thai, Jiu-Jitsu, Boxe e Performance</p>
            <h1>Uma academia de luta com estrutura de plataforma profissional.</h1>
            <p>
              Treinos intensos, acompanhamento de alunos, evolução física registrada e
              controle de mensalidades em um só lugar.
            </p>
            <div className="hero-actions">
              <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">Agende sua aula experimental</a>
              <Link className="button secondary" href="/login">Entrar na área do aluno</Link>
            </div>
          </div>
        </section>

        <section className="home-photo-story" aria-label="Fotos da academia e treinos">
          <article className="photo-feature fight-night">
            <span>Competição</span>
            <strong>Atletas preparados para lutar de verdade.</strong>
          </article>
          <article className="photo-feature ring-action">
            <span>Treino técnico</span>
            <strong>Muay Thai com intensidade, base e precisão.</strong>
          </article>
          <article className="photo-feature coach-work">
            <span>Professor</span>
            <strong>Correção próxima em cada round.</strong>
          </article>
        </section>

        <section className="section split">
          <div>
            <p className="eyebrow">A academia</p>
            <h2>Treino forte. Técnica limpa. Equipe presente.</h2>
          </div>
        </section>

        <section className="section no-top proof-section">
          <div className="cards three video-cards">
            {trainingVideos.map((item) => (
              <article className="video-card" key={item.title}>
                <video autoPlay muted loop playsInline poster={item.poster} aria-hidden="true">
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className="video-card-shade" />
                <div className="video-card-copy">
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section no-top">
          <div className="cards four discipline-cards">
            {disciplines.map((discipline, index) => (
              <article className="card discipline-card" key={discipline.name}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{discipline.name}</h3>
                <p>{discipline.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section master-band">
          <div>
            <p className="eyebrow">Prof. Luis “Tidi” Fernando</p>
            <h2>Experiência de campeão dentro da sua rotina.</h2>
          </div>
          <div className="master-stats">
            <article><strong>30+</strong><span>anos nas artes marciais</span></article>
            <article><strong>70+</strong><span>lutas disputadas</span></article>
            <article><strong>2018</strong><span>campeão mundial WMO na Tailândia</span></article>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <p className="eyebrow">Planos</p>
            <h2>Escolha o ritmo do treino.</h2>
          </div>
          <div className="cards three">
            {plans.map((plan) => (
              <article className={plan.featured ? "card featured plan-card" : "card plan-card"} key={plan.name}>
                <h3>{plan.name}</h3>
                <strong className="price">{plan.price}</strong>
                <p>por mês, sem fidelidade</p>
                <ul>
                  {plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                </ul>
                <a className={plan.featured ? "button primary" : "button secondary"} href={whatsappHref} target="_blank" rel="noreferrer">
                  Quero esse plano
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section split">
          <div>
            <p className="eyebrow">Horários</p>
            <h2>Grade organizada para encaixar na rotina.</h2>
          </div>
          <div className="list-panel">
            {schedules.map(([name, time]) => (
              <div key={name}>
                <strong>{name}</strong>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-band">
          <p className="eyebrow">Primeiro passo</p>
          <h2>Venha sentir o treino antes de decidir.</h2>
          <p>
            Conheça a energia do treino na prática.
          </p>
          <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">Marcar pelo WhatsApp</a>
        </section>
      </main>
    </PublicPage>
  );
}
