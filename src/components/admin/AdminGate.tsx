import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { field } from "./shared";

const SESSION_KEY = "cariri-admin-auth";
const PASSWORD = import.meta.env['VITE_ADMIN_PASSWORD'] as string | undefined;

// Barreira simples no navegador: impede acesso casual ao painel, mas NÃO é segurança real
// (a senha vai junto com o código do site). Proteção de verdade exige backend.
export default function AdminGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      /* sem sessionStorage: pede senha a cada visita */
    }
    setReady(true);
  }, []);

  if (!ready) return null;
  if (authed) return <>{children}</>;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (PASSWORD && input === PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignora */
      }
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-card p-6 ring-1 ring-border"
      >
        <h1 className="font-display text-2xl uppercase text-foreground">
          Cariri<span className="text-primary">.</span> Painel
        </h1>
        {!PASSWORD && (
          <p className="rounded-md bg-secondary p-3 text-xs text-muted-foreground">
            Senha não configurada. Defina a variável <code>VITE_ADMIN_PASSWORD</code> (no arquivo
            .env ou na Vercel) e reinicie/redeploy.
          </p>
        )}
        <input
          type="password"
          autoFocus
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="Senha do painel"
          className={`${field} w-full`}
        />
        {error && <p className="text-sm text-destructive">Senha incorreta.</p>}
        <button
          disabled={!PASSWORD}
          className="w-full rounded-md bg-primary py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
