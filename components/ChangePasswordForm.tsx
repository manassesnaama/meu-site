"use client";

import { useActionState } from "react";
import { changeInitialPassword } from "@/app/trocar-senha/actions";

export function ChangePasswordForm() {
  const [errorMessage, action, pending] = useActionState(changeInitialPassword, undefined);

  return (
    <form action={action} className="login-fields">
      <label>
        Nova senha
        <input name="password" type="password" placeholder="Minimo de 8 caracteres" autoComplete="new-password" required minLength={8} />
      </label>
      <label>
        Confirmar nova senha
        <input name="confirmation" type="password" placeholder="Digite novamente" autoComplete="new-password" required minLength={8} />
      </label>
      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      <button className="button primary" type="submit" disabled={pending}>
        {pending ? "Salvando..." : "Salvar nova senha"}
      </button>
    </form>
  );
}
