"use server";

import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const photoData = z.string().max(360_000).optional();

const updateStudentSchema = z.object({
  studentId: z.string().min(1),
  name: z.string().trim().min(3),
  phone: z.string().trim().min(8),
  username: z.string().trim().min(3),
  email: z.string().trim().email().optional().or(z.literal("")),
  cpf: z.string().trim().optional(),
  address: z.string().trim().min(5),
  age: z.coerce.number().int().min(3).max(100),
  hasHealthIssue: z.enum(["yes", "no"]),
  healthNotes: z.string().trim().optional(),
  planId: z.string().min(1),
  dueDate: z.string().min(1),
  password: z.string().optional(),
  photoData,
  removePhoto: z.enum(["yes", "no"])
});

async function requireAdmin() {
  const session = await auth();

  if (!session?.user || session.user.role === "STUDENT" || session.user.mustChangePassword) {
    throw new Error("Acesso negado.");
  }

  return session.user;
}

export async function updateStudent(formData: FormData) {
  await requireAdmin();
  const parsed = updateStudentSchema.parse(Object.fromEntries(formData.entries()));
  const current = await prisma.student.findUnique({ where: { id: parsed.studentId }, select: { userId: true } });

  if (!current) throw new Error("Aluno nao encontrado.");

  const userData: {
    name: string;
    username: string;
    email: string | null;
    imageUrl?: string | null;
    passwordHash?: string;
    mustChangePassword?: boolean;
  } = {
    name: parsed.name,
    username: parsed.username,
    email: parsed.email || null
  };

  if (parsed.photoData) userData.imageUrl = parsed.photoData;
  if (parsed.removePhoto === "yes") userData.imageUrl = null;
  if (parsed.password) {
    if (parsed.password.length < 6) throw new Error("A nova senha precisa ter pelo menos 6 caracteres.");
    userData.passwordHash = await hash(parsed.password, 12);
    userData.mustChangePassword = true;
  }

  await prisma.student.update({
    where: { id: parsed.studentId },
    data: {
      phone: parsed.phone,
      cpf: parsed.cpf || null,
      address: parsed.address,
      age: parsed.age,
      hasHealthIssue: parsed.hasHealthIssue === "yes",
      healthNotes: parsed.hasHealthIssue === "yes" ? parsed.healthNotes || null : null,
      currentPlan: { connect: { id: parsed.planId } },
      dueDate: new Date(`${parsed.dueDate}T12:00:00`),
      user: { update: userData }
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/alunos");
  revalidatePath(`/admin/alunos/${parsed.studentId}/editar`);
  redirect("/admin/alunos");
}

export async function deleteStudent(formData: FormData) {
  await requireAdmin();
  const studentId = z.string().min(1).parse(formData.get("studentId"));
  const student = await prisma.student.findUnique({ where: { id: studentId }, select: { userId: true } });

  if (!student) throw new Error("Aluno nao encontrado.");

  await prisma.user.delete({ where: { id: student.userId } });
  revalidatePath("/admin");
  revalidatePath("/admin/alunos");
  revalidatePath("/admin/financeiro");
}
