"use client";

import { useMemo, useState } from "react";
import { PayButton } from "@/components/PayButton";
import type { PaymentStatus } from "@/lib/status";

type FinancialStudent = {
  id: string;
  name: string;
  plan: string;
  dueDate: string;
  status: PaymentStatus;
  statusText: string;
  canPay: boolean;
};

type FinancialPayment = {
  id: string;
  studentName: string;
  amount: string;
  paidAt: string;
  method: string;
  nextDue: string;
};

const filters: Array<{ id: "all" | PaymentStatus; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "warning", label: "Vencendo" },
  { id: "overdue", label: "Vencidos" },
  { id: "inactive", label: "Inativos" },
  { id: "paid", label: "Em dia" }
];

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}

function distance(left: string, right: string) {
  const rows = Array.from({ length: left.length + 1 }, (_, index) => index);
  for (let column = 1; column <= right.length; column += 1) {
    let previous = rows[0];
    rows[0] = column;
    for (let row = 1; row <= left.length; row += 1) {
      const saved = rows[row];
      rows[row] = Math.min(
        rows[row] + 1,
        rows[row - 1] + 1,
        previous + (left[row - 1] === right[column - 1] ? 0 : 1)
      );
      previous = saved;
    }
  }
  return rows[left.length];
}

function matchesName(name: string, search: string) {
  const term = normalize(search);
  if (!term) return true;
  const fullName = normalize(name);
  if (fullName.includes(term)) return true;
  return fullName.split(" ").some((word) => distance(word, term) <= (term.length > 4 ? 2 : 1));
}

export function FinancialStudents({ students, payments }: { students: FinancialStudent[]; payments: FinancialPayment[] }) {
  const [filter, setFilter] = useState<"all" | PaymentStatus>("all");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    return students.filter((student) => {
      const matchesFilter = filter === "all" || student.status === filter;
      return matchesFilter && matchesName(student.name, search);
    });
  }, [filter, search, students]);
  const visibleNames = new Set(visible.map((student) => student.name));
  const visiblePayments = payments.filter((payment) => visibleNames.has(payment.studentName));

  function totalFor(id: "all" | PaymentStatus) {
    return id === "all" ? students.length : students.filter((student) => student.status === id).length;
  }

  return (
    <>
      <section className="filters finance-filters">
        {filters.map((item) => (
          <button className={filter === item.id ? "active" : ""} key={item.id} type="button" onClick={() => setFilter(item.id)}>
            {item.label} ({totalFor(item.id)})
          </button>
        ))}
        <input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setFilter("all");
          }}
          placeholder="Buscar aluno por nome"
        />
        {search ? <button type="button" onClick={() => setSearch("")}>Limpar</button> : null}
      </section>
      <p className="filter-result">{visible.length} aluno(s) encontrado(s)</p>
      <section className="cards three finance-cards">
        {visible.map((student) => (
          <article className="card finance-card" key={student.id}>
            <div className="finance-card-top">
              <h3>{student.name}</h3>
              <span className={`status ${student.status}`}>{student.statusText}</span>
            </div>
            <p>{student.plan}</p>
            <p>Vencimento: <strong>{student.dueDate}</strong></p>
            {student.canPay ? <PayButton studentId={student.id} /> : <p>Defina um plano para receber pagamento.</p>}
          </article>
        ))}
        {visible.length === 0 ? <p className="empty-state">Nenhum aluno encontrado.</p> : null}
      </section>
      <section className="table-panel spaced">
        <h2 className="panel-heading">Historico de pagamentos</h2>
        <table>
          <thead><tr><th>Aluno</th><th>Valor</th><th>Data</th><th>Forma</th><th>Proximo vencimento</th></tr></thead>
          <tbody>
            {visiblePayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.studentName}</td>
                <td>{payment.amount}</td>
                <td>{payment.paidAt}</td>
                <td>{payment.method}</td>
                <td>{payment.nextDue}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visiblePayments.length === 0 ? <p className="empty-state">Nenhum pagamento encontrado para este filtro.</p> : null}
      </section>
    </>
  );
}
