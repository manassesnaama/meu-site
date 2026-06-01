"use client";

import { deleteStudent } from "@/app/admin/alunos/actions";

export function DeleteStudentButton({ studentId, studentName }: { studentId: string; studentName: string }) {
  return (
    <form
      action={deleteStudent}
      onSubmit={(event) => {
        if (!window.confirm(`Excluir o cadastro de ${studentName}? O historico deste aluno tambem sera removido.`)) {
          event.preventDefault();
        }
      }}
    >
      <input name="studentId" type="hidden" value={studentId} />
      <button className="table-action danger" type="submit">Excluir</button>
    </form>
  );
}
