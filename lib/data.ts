import { getPaymentStatus, statusLabel } from "@/lib/status";

export const whatsappNumber = "5519971669311";
export const whatsappText = "Olá, quero marcar uma aula experimental na Tidi Thai Team.";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/planos", label: "Planos" },
  { href: "/sobre", label: "Sobre Mim" },
  { href: "/contato", label: "Contato" }
];

export const disciplines = [
  {
    name: "Muay Thai",
    detail: "A arte das oito armas."
  },
  {
    name: "Jiu-Jitsu",
    detail: "Controle, defesa e finalizações."
  },
  {
    name: "Boxe",
    detail: "Ritmo, esquiva e precisão."
  },
  {
    name: "Personal Training",
    detail: "Treino individual sob medida."
  }
];

export const plans = [
  { name: "1 Modalidade", price: "R$120", group: "individual", subtitle: "1 pessoa", benefits: ["1 modalidade à escolha", "Acesso aos horários da turma", "Treino sem fidelidade"] },
  { name: "2 Modalidades", price: "R$150", group: "individual", subtitle: "1 pessoa", featured: true, benefits: ["2 modalidades à escolha", "Mais variedade de treino", "Melhor ritmo semanal"] },
  { name: "3 Modalidades", price: "R$180", group: "individual", subtitle: "1 pessoa", benefits: ["Muay Thai + Jiu-Jitsu + Boxe", "Experiência completa", "Melhor custo-benefício individual"] },
  { name: "Família 2", price: "R$220", group: "family", subtitle: "2 pessoas", benefits: ["Libera 2 modalidades", "Plano para treinar em família", "Economia na mensalidade"] },
  { name: "Familiar 3", price: "R$250", group: "family", subtitle: "3 pessoas", benefits: ["Libera 2 modalidades", "Mais alunos no mesmo plano", "Ótimo custo-benefício familiar"] },
  { name: "Premium Familiar", price: "R$300", group: "family", subtitle: "4 pessoas", featured: true, benefits: ["Todas as modalidades", "Até 4 pessoas", "Plano mais completo da academia"] }
];

export const schedules = [
  ["Muay Thai Adulto", "Seg / Qua / Sex - 06h e 19h | Ter / Qui - 20h"],
  ["Muay Thai Kids", "Ter / Qui - 18h"],
  ["Jiu-Jitsu Adulto", "Seg / Qua / Sex - 20h"],
  ["Jiu-Jitsu Kids", "Ter / Qui - 19h"],
  ["Boxe", "Seg / Qua - 20h"]
];

export const classSchedule = [
  { time: "06h", monday: "Muay Thai Adulto", tuesday: "", wednesday: "Muay Thai Adulto", thursday: "", friday: "Muay Thai Adulto" },
  { time: "18h", monday: "", tuesday: "Muay Thai Kids", wednesday: "", thursday: "Muay Thai Kids", friday: "" },
  { time: "19h", monday: "Muay Thai Adulto", tuesday: "Jiu-Jitsu Kids", wednesday: "Muay Thai Adulto", thursday: "Jiu-Jitsu Kids", friday: "Muay Thai Adulto" },
  { time: "20h", monday: "Jiu-Jitsu Adulto / Boxe", tuesday: "Muay Thai Adulto", wednesday: "Jiu-Jitsu Adulto / Boxe", thursday: "Muay Thai Adulto", friday: "Jiu-Jitsu Adulto" }
];

export const students = [
  { name: "Rafael Souza", plan: "2 Modalidades", dueDate: "2026-05-25", phone: "(19) 98888-1100", email: "rafael@email.com", attendance: 18 },
  { name: "Lívia Martins", plan: "3 Modalidades", dueDate: "2026-05-19", phone: "(19) 97777-2200", email: "livia@email.com", attendance: 22 },
  { name: "Marcos Lima", plan: "1 Modalidade", dueDate: "2026-04-10", phone: "(19) 96666-3300", email: "marcos@email.com", attendance: 7 },
  { name: "Ana Clara", plan: "2 Modalidades", dueDate: "2026-06-12", phone: "(19) 95555-4400", email: "ana@email.com", attendance: 14 }
].map((student) => {
  const status = getPaymentStatus(student.dueDate);
  return { ...student, status, statusLabel: statusLabel(status) };
});

export const payments = [
  { student: "Rafael Souza", value: "R$150", date: "2026-04-25", nextDue: "2026-05-25", method: "Pix" },
  { student: "Lívia Martins", value: "R$180", date: "2026-04-19", nextDue: "2026-05-19", method: "Dinheiro" },
  { student: "Ana Clara", value: "R$150", date: "2026-05-12", nextDue: "2026-06-12", method: "Cartão" }
];

export const notices = [
  "Lions Fight: seletiva interna no próximo sábado.",
  "Avaliações físicas disponíveis para alunos ativos.",
  "Atualize sua foto de evolução mensalmente pelo painel."
];

export const evolutionPhotos = [
  { title: "Início do ciclo", date: "2026-03-18", note: "Registro frontal e lateral" },
  { title: "30 dias", date: "2026-04-18", note: "Melhora de postura e condicionamento" },
  { title: "60 dias", date: "2026-05-18", note: "Comparativo pronto para avaliação" }
];
