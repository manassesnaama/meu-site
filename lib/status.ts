export type PaymentStatus = "paid" | "warning" | "overdue" | "inactive";

const day = 24 * 60 * 60 * 1000;

export function addThirtyDays(date = new Date()) {
  const next = new Date(date);
  next.setDate(next.getDate() + 30);
  return next;
}

export function getPaymentStatus(dueDate: string | Date, now = new Date()): PaymentStatus {
  const due = typeof dueDate === "string" ? new Date(`${dueDate}T12:00:00`) : dueDate;
  const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / day);
  const daysOverdue = Math.ceil((now.getTime() - due.getTime()) / day);

  if (daysOverdue >= 30) return "inactive";
  if (daysUntilDue < 0) return "overdue";
  if (daysUntilDue <= 10) return "warning";
  return "paid";
}

export function statusLabel(status: PaymentStatus) {
  return {
    paid: "Pago",
    warning: "Próximo do vencimento",
    overdue: "Vencido",
    inactive: "Inativo"
  }[status];
}
