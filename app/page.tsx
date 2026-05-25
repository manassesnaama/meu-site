import Link from "next/link";
import { PublicPage } from "@/components/PublicPage";
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
            <h1>Tidi Thai Team</h1>
            <div className="hero-actions">
              <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">Agendar aula grátis</a>
              <Link className="button secondary" href="/sobre">Conhecer o professor</Link>
            </div>
          </div>
        </section>

        <section className="home-photo-story" aria-label="Fotos da academia e treinos">
          <article className="photo-feature fight-night">
            <span>Competição</span>
            <strong>Atletas da casa.</strong>
          </article>
          <article className="photo-feature ring-action">
            <span>Treino técnico</span>
            <strong>Round por round.</strong>
          </article>
          <article className="photo-feature coach-work">
            <span>Professor</span>
            <strong>Olhar de perto.</strong>
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
      </main>
    </PublicPage>
  );
}
