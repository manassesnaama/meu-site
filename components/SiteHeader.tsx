import Link from "next/link";
import { navLinks } from "@/lib/data";
import { whatsappHref } from "@/lib/whatsapp";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Tidi Thai Team">
        <span className="brand-mark">
          <img src="/assets/logo-oficial.jpg" alt="" />
        </span>
        <span>
          <strong>Tidi Thai</strong>
          <small>Team</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Navegação principal">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="event-link" href="/lions-fight">Lions Fight</Link>
        <Link className="ghost-link" href="/login">Entrar</Link>
        <a className="solid-link" href={whatsappHref} target="_blank" rel="noreferrer">Aula experimental</a>
      </div>
    </header>
  );
}
