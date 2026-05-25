"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PayButton({ studentId }: { studentId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function pay() {
    setPending(true);
    setError("");

    const response = await fetch(`/api/admin/students/${studentId}/pay`, {
      method: "POST"
    });

    if (!response.ok) {
      setError("Nao foi possivel registrar.");
      setPending(false);
      return;
    }

    setPending(false);
    router.refresh();
  }

  return (
    <>
      <button className="button primary" type="button" onClick={pay} disabled={pending}>
        {pending ? "Registrando..." : "Marcar como paga +30 dias"}
      </button>
      {error ? <p className="form-error">{error}</p> : null}
    </>
  );
}
