import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { addThirtyDays } from "@/lib/status";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user || session.user.role === "STUDENT" || session.user.mustChangePassword) {
    return NextResponse.json({ message: "Acesso negado." }, { status: 403 });
  }

  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: { currentPlan: true }
  });

  if (!student?.currentPlan) {
    return NextResponse.json({ message: "Aluno ou plano atual nao encontrado." }, { status: 404 });
  }

  const nextDue = addThirtyDays();
  const payment = await prisma.$transaction(async (transaction) => {
    const createdPayment = await transaction.payment.create({
      data: {
        studentId: student.id,
        amount: student.currentPlan!.price,
        nextDue
      }
    });

    await transaction.student.update({
      where: { id: student.id },
      data: {
        dueDate: nextDue,
        status: "ACTIVE",
        active: true
      }
    });

    return createdPayment;
  });

  return NextResponse.json({
    paymentId: payment.id,
    studentId: id,
    paid: true,
    nextDue: nextDue.toISOString()
  });
}
