"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/login/actions";

export function LoginForm() {
  const [errorMessage, action, pending] = useActionState(authenticate, undefined);

  return (
    <form action={action} className="login-fields">
      <label>
        Usuario
        <input name="username" type="text" placeholder="Seu login" autoComplete="username" required />
      </label>
      <label>
        Senha
        <input name="password" type="password" placeholder="Sua senha" autoComplete="current-password" required />
      </label>
      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      <button className="button primary" type="submit" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
