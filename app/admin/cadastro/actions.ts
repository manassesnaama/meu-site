"use server";

import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const studentSchema = z.object({
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
  password: z.string().min(6),
  photoData: z.string().max(360_000).optional()
});

export async function createStudent(formData: FormData) {
  const session = await auth();

  if (!session?.user || session.user.role === "STUDENT" || session.user.mustChangePassword) {
    throw new Error("Acesso negado.");
  }

  const parsed = studentSchema.parse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    username: formData.get("username"),
    email: formData.get("email"),
    cpf: formData.get("cpf"),
    address: formData.get("address"),
    age: formData.get("age"),
    hasHealthIssue: formData.get("hasHealthIssue"),
    healthNotes: formData.get("healthNotes"),
    planId: formData.get("planId"),
    dueDate: formData.get("dueDate"),
    password: formData.get("password"),
    photoData: formData.get("photoData")
  });

  await prisma.user.create({
    data: {
      name: parsed.name,
      username: parsed.username,
      email: parsed.email || null,
      passwordHash: await hash(parsed.password, 12),
      mustChangePassword: true,
      role: "STUDENT",
      imageUrl: parsed.photoData || null,
      student: {
        create: {
          phone: parsed.phone,
          cpf: parsed.cpf || null,
          address: parsed.address,
          age: parsed.age,
          hasHealthIssue: parsed.hasHealthIssue === "yes",
          healthNotes: parsed.hasHealthIssue === "yes" ? parsed.healthNotes || null : null,
          dueDate: new Date(`${parsed.dueDate}T12:00:00`),
          currentPlanId: parsed.planId
        }
      }
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/alunos");
  redirect("/admin/alunos");
}
