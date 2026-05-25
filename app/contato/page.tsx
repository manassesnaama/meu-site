import { PublicPage } from "@/components/PublicPage";
import { whatsappHref } from "@/lib/whatsapp";

export default function ContatoPage() {
  return (
    <PublicPage>
      <main className="page-top">
        <section className="contact-section">
          <div>
            <p className="eyebrow">Contato</p>
            <h1>Agende sua aula experimental.</h1>
            <p className="lead">
              Chame o professor no WhatsApp, tire dúvidas sobre planos e escolha o melhor horário para começar.
            </p>
            <dl className="contact-list">
              <div><dt>Endereço</dt><dd>R. Pernambuco, 470 - Vila Santa Rosa</dd></div>
              <div><dt>WhatsApp</dt><dd>(19) 97166-9311</dd></div>
              <div><dt>Instagram</dt><dd>@tididthaiiteam</dd></div>
            </dl>
          </div>
          <div className="form-card">
            <label>Nome<input name="name" placeholder="Seu nome" /></label>
            <label>WhatsApp<input name="phone" placeholder="Seu telefone" /></label>
            <label>Objetivo<textarea name="message" placeholder="Quero treinar Muay Thai, Jiu-Jitsu, Boxe..." /></label>
            <a className="button primary" href={whatsappHref} target="_blank" rel="noreferrer">Enviar pelo WhatsApp</a>
          </div>
        </section>
      </main>
    </PublicPage>
  );
}
