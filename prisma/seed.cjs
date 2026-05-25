const { PrismaClient, Role } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();
const initialAdmins = [
  { name: "Luis Fernando", username: "luis.fernando" },
  { name: "Manasses Mello", username: "manasses.mello" }
];

const plans = [
  {
    name: "1 Modalidade",
    price: "120.00",
    benefits: ["1 modalidade a escolha", "Acesso aos horarios da turma", "Treino sem fidelidade"]
  },
  {
    name: "2 Modalidades",
    price: "150.00",
    benefits: ["2 modalidades a escolha", "Mais variedade de treino", "Melhor ritmo semanal"]
  },
  {
    name: "3 Modalidades",
    price: "180.00",
    benefits: ["Muay Thai + Jiu-Jitsu + Boxe", "Experiencia completa", "Melhor custo-beneficio individual"]
  },
  {
    name: "Familia 2",
    price: "220.00",
    benefits: ["Libera 2 modalidades", "Plano para duas pessoas", "Economia na mensalidade"]
  },
  {
    name: "Familiar 3",
    price: "250.00",
    benefits: ["Libera 2 modalidades", "Plano para tres pessoas", "Melhor custo familiar"]
  },
  {
    name: "Premium Familiar",
    price: "300.00",
    benefits: ["Todas as modalidades", "Ate quatro pessoas", "Plano mais completo"]
  }
];

async function main() {
  const temporaryAdminPassword = process.env.INITIAL_ADMIN_PASSWORD;

  if (!temporaryAdminPassword || temporaryAdminPassword.length < 6) {
    throw new Error("Defina INITIAL_ADMIN_PASSWORD apenas durante a criacao inicial dos administradores.");
  }

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan
    });
  }

  const initialPasswordHash = await hash(temporaryAdminPassword, 12);

  for (const admin of initialAdmins) {
    await prisma.user.upsert({
      where: { username: admin.username },
      update: {
        name: admin.name,
        role: Role.ADMIN
      },
      create: {
        name: admin.name,
        username: admin.username,
        passwordHash: initialPasswordHash,
        mustChangePassword: true,
        role: Role.ADMIN
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
