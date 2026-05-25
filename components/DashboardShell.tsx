import Link from "next/link";
import { ReactNode } from "react";
import { signOut } from "@/auth";

type DashboardShellProps = {
  role: "Aluno" | "Admin";
  title: string;
  nav: Array<{ href: string; label: string }>;
  children: ReactNode;
};

export function DashboardShell({ role, title, nav, children }: DashboardShellProps) {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <Link href="/" className="brand compact">
          <span className="brand-mark">
            <img src="/assets/logo-oficial.jpg" alt="" />
          </span>
          <span>
            <strong>{role}</strong>
            <small>Tidi Thai</small>
          </span>
        </Link>
        <nav>
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-top">
          <div>
            <p className="eyebrow">Painel {role}</p>
            <h1>{title}</h1>
          </div>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}>
            <button className="ghost-link" type="submit">Sair</button>
          </form>
        </div>
        {children}
      </main>
    </div>
  );
}
