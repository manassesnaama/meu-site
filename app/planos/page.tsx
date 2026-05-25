import { PublicPage } from "@/components/PublicPage";
import { classSchedule, plans } from "@/lib/data";
import { whatsappHref } from "@/lib/whatsapp";

export default function PlanosPage() {
  const individualPlans = plans.filter((plan) => plan.group === "individual");
  const familyPlans = plans.filter((plan) => plan.group === "family");

  return (
    <PublicPage>
      <main className="page-top plans-page">
        <section className="section">
          <p className="eyebrow">Mensalidades</p>
          <h1>Planos da academia</h1>
          <p className="lead plan-lead">
            Escolha entre planos individuais ou familiares. Todos sao mensais e pensados para facilitar a rotina de treino.
          </p>
        </section>

        <section className="plans-band individual-band">
          <div className="plans-group-heading">
            <span>1 pessoa</span>
          </div>
          <div className="plans-visual" aria-hidden="true">
            <img src="/assets/plans/individual-plans.png" alt="" />
            <strong>Planos individuais</strong>
          </div>
          <div className="plans-showcase individual-plans">
            {individualPlans.map((plan) => (
              <article className={plan.featured ? "card featured plan-card" : "card plan-card"} key={plan.name}>
                {plan.featured ? <span className="plan-badge">Mais escolhido</span> : null}
                <h3>{plan.name}</h3>
                <strong className="price">{plan.price}</strong>
                <p>{plan.subtitle} - por mes</p>
                <ul>{plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
                <a className={plan.featured ? "button primary" : "button secondary"} href={whatsappHref} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
              </article>
            ))}
          </div>
        </section>

        <section className="plans-band family-band">
          <div className="plans-group-heading">
            <span>2 a 4 pessoas</span>
          </div>
          <div className="plans-visual" aria-hidden="true">
            <img src="/assets/plans/family-plans.png" alt="" />
            <strong>Planos familia</strong>
          </div>
          <div className="plans-showcase family-plans">
            {familyPlans.map((plan) => (
              <article className={plan.featured ? "card featured plan-card" : "card plan-card"} key={plan.name}>
                {plan.featured ? <span className="plan-badge">Mais completo</span> : null}
                <h3>{plan.name}</h3>
                <strong className="price">{plan.price}</strong>
                <p>{plan.subtitle} - por mes</p>
                <ul>{plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
                <a className={plan.featured ? "button primary" : "button secondary"} href={whatsappHref} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section schedule-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Grade de aulas</p>
              <h2>Horarios da semana</h2>
            </div>
            <p>Consulte a equipe para confirmar vagas na turma escolhida.</p>
          </div>
          <div className="schedule-table-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Horario</th>
                  <th>Segunda</th>
                  <th>Terca</th>
                  <th>Quarta</th>
                  <th>Quinta</th>
                  <th>Sexta</th>
                </tr>
              </thead>
              <tbody>
                {classSchedule.map((row) => (
                  <tr key={row.time}>
                    <th>{row.time}</th>
                    <td>{row.monday || <span className="empty-slot">-</span>}</td>
                    <td>{row.tuesday || <span className="empty-slot">-</span>}</td>
                    <td>{row.wednesday || <span className="empty-slot">-</span>}</td>
                    <td>{row.thursday || <span className="empty-slot">-</span>}</td>
                    <td>{row.friday || <span className="empty-slot">-</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
