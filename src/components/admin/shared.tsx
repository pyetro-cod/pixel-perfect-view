import { useEffect, useState } from "react";
import { categories, type CategorySlug } from "@/data/catalog";

export const box = "rounded-xl bg-card p-5 ring-1 ring-border";
export const LOW_STOCK = 6;
export const field =
  "rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary";

export const chipClass = (active: boolean) =>
  `shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors ${
    active
      ? "bg-primary text-primary-foreground"
      : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground"
  }`;

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar por nome ou marca…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${field} min-w-0 flex-1`}
    />
  );
}

export function CategorySelect({
  value,
  onChange,
}: {
  value: CategorySlug | "";
  onChange: (v: CategorySlug | "") => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as CategorySlug | "")}
      className={field}
    >
      <option value="">Todas as categorias</option>
      {categories.map((c) => (
        <option key={c.slug} value={c.slug}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export const matches = (p: { name: string; brand: string }, q: string) =>
  !q || `${p.name} ${p.brand}`.toLowerCase().includes(q.trim().toLowerCase());

// Campo numérico que só grava ao sair do campo (ou Enter), evitando salvar a cada tecla.
export function NumberInput({
  value,
  onCommit,
  step = 1,
  min = 0,
  className = "w-24",
  ariaLabel,
}: {
  value: number;
  onCommit: (n: number) => void;
  step?: number;
  min?: number;
  className?: string;
  ariaLabel: string;
}) {
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);

  const commit = () => {
    const n = Number(text.replace(",", "."));
    if (!Number.isFinite(n) || n < min) {
      setText(String(value));
      return;
    }
    if (n !== value) onCommit(n);
  };

  return (
    <input
      type="number"
      inputMode="decimal"
      aria-label={ariaLabel}
      step={step}
      min={min}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
      className={`${field} ${className} px-2 py-1`}
    />
  );
}
