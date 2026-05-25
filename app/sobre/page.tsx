import { PublicPage } from "@/components/PublicPage";

export default function SobrePage() {
  const tidiPhotos = [
    "/assets/about/tidi-01.jpg",
    "/assets/about/tidi-02.jpg",
    "/assets/about/tidi-03.jpg",
    "/assets/about/tidi-04.jpg",
    "/assets/about/tidi-05.jpg"
  ];

  const instructors = [
    {
      name: "Manassés Mello",
      role: "Instrutor de Muay Thai e Boxe",
      description:
        "Aos 27 anos, Manassés começou sua trajetória com Luis “Tidi” Fernando em 2014 e segue na equipe desde então. Atua nas aulas de Muay Thai e Boxe, mantendo a metodologia e o padrão técnico da academia.",
      graduation: "Graduação vermelha de ponta branca - professor em treinamento",
      achievements: ["Campeão Open Team Nikolai Campinas", "Campeão Open Team Americana"],
      photos: ["/assets/about/instrutor-01-01.jpg", "/assets/about/instrutor-01-02.jpg"]
    },
    {
      name: "Margarete “Margo” Soares",
      role: "Instrutora de Muay Thai e Jiu-Jitsu",
      description:
        "Aos 49 anos, Margarete “Margo” Soares começou sua trajetória na equipe em 2019. Atua como instrutora de Muay Thai e Jiu-Jitsu, contribuindo para o desenvolvimento técnico dos alunos nas aulas.",
      graduation: "Graduação vermelha de ponta branca no Muay Thai e faixa marrom de Jiu-Jitsu",
      achievements: [
        "Bicampeã mundial de Jiu-Jitsu",
        "Campeã paulista de Jiu-Jitsu",
        "3x campeã Open Boxe Sul de Minas",
        "Campeã interestadual de Muay Thai em Bragança"
      ],
      photos: ["/assets/about/instrutor-02-01.jpg", "/assets/about/instrutor-02-02.jpg"]
    }
  ];

  return (
    <PublicPage>
      <main className="page-top">
        <section className="about-hero">
          <div className="about-copy">
            <p className="eyebrow">Professor e dono da academia</p>
            <h1>Prof. Luis “Tidi” Fernando</h1>
            <p>
              Com mais de 30 anos nas artes marciais e mais de 20 anos dedicados ao Muay Thai,
              o Prof. Luis “Tidi” Fernando construiu uma trajetória marcada por disciplina,
              competição e formação de atletas. Campeão Mundial pela WMO na Tailândia em 2018,
              leva para cada treino a vivência de quem enfrentou o alto nível.
            </p>
          </div>
          <div className="about-carousel featured-carousel" aria-label="Fotos do Prof. Luis Tidi Fernando">
            {tidiPhotos.map((photo, index) => (
              <figure key={photo} style={{ backgroundImage: `url(${photo})` }}>
                <figcaption>{index === 0 ? "Professor principal" : "Trajetória e treino"}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="achievement-grid">
            <article><strong>30+</strong><span>anos nas artes marciais</span></article>
            <article><strong>20+</strong><span>anos no Muay Thai</span></article>
            <article><strong>70+</strong><span>lutas disputadas</span></article>
            <article><strong>60+</strong><span>vitórias</span></article>
          </div>
        </section>

        <section className="section split">
          <div>
            <p className="eyebrow">Trajetória no esporte</p>
            <h2>Vivência real de competição dentro do treino.</h2>
          </div>
          <div className="list-panel">
            <div><strong>Campeão Mundial WMO</strong><span>Conquista na Tailândia em 2018.</span></div>
            <div><strong>3 títulos brasileiros</strong><span>Resultados nacionais construídos ao longo da carreira.</span></div>
            <div><strong>2 títulos paulistas</strong><span>Referência competitiva no estado.</span></div>
            <div><strong>1 título interestadual</strong><span>Experiência em eventos de alto nível.</span></div>
          </div>
        </section>

        <section className="section instructor-section">
          <div className="section-title">
            <p className="eyebrow">Equipe de apoio</p>
            <h2>Instrutores que mantêm o padrão do treino.</h2>
          </div>
          <div className="instructor-grid">
            {instructors.map((instructor, index) => (
              <article className="instructor-card" key={`${instructor.name}-${index}`}>
                <div className="about-carousel compact-carousel" aria-label={`Fotos do ${instructor.name}`}>
                  {instructor.photos.map((photo) => (
                    <figure key={photo} style={{ backgroundImage: `url(${photo})` }}>
                      <figcaption>Instrutor</figcaption>
                    </figure>
                  ))}
                </div>
                <div>
                  <h3>{instructor.name}</h3>
                  <p>{instructor.role}</p>
                  <p>{instructor.description}</p>
                  <span className="instructor-rank">{instructor.graduation}</span>
                  <ul className="instructor-achievements">
                    {instructor.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
