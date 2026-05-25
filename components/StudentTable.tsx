"use client";

import { useMemo, useState } from "react";
import type { PaymentStatus } from "@/lib/status";

type StudentRow = {
  id: string;
  name: string;
  plan: string;
  phone: string;
  dueDate: string;
  status: PaymentStatus;
  statusText: string;
};

const filters: Array<{ id: "all" | PaymentStatus; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "paid", label: "Em dia" },
  { id: "warning", label: "Vencendo" },
  { id: "overdue", label: "Vencidos" },
  { id: "inactive", label: "Inativos" }
];

export function StudentTable({ students }: { students: StudentRow[] }) {
  const [filter, setFilter] = useState<"all" | PaymentStatus>("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    return students.filter((student) => {
      const matchesFilter = filter === "all" || student.status === filter;
      return matchesFilter && (!term || student.name.toLocaleLowerCase("pt-BR").includes(term));
    });
  }, [filter, search, students]);

  function totalFor(id: "all" | PaymentStatus) {
    return id === "all" ? students.length : students.filter((student) => student.status === id).length;
  }

  return (
    <>
      <section className="filters">
        {filters.map((item) => (
          <button className={filter === item.id ? "active" : ""} key={item.id} type="button" onClick={() => setFilter(item.id)}>
            {item.label} ({totalFor(item.id)})
          </button>
        ))}
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nome" />
      </section>
      <section className="table-panel">
        <table>
          <thead><tr><th>Aluno</th><th>Plano</th><th>Telefone</th><th>Vencimento</th><th>Status</th></tr></thead>
          <tbody>
            {visible.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.plan}</td>
                <td>{student.phone}</td>
                <td>{student.dueDate}</td>
                <td><span className={`status ${student.status}`}>{student.statusText}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 ? <p className="empty-state">Nenhum aluno encontrado.</p> : null}
      </section>
    </>
  );
}
