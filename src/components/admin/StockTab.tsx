import { useState } from "react";
import { categoryName, type CategorySlug } from "@/data/catalog";
import { useStore } from "@/lib/store";
import {
  CategorySelect,
  LOW_STOCK,
  NumberInput,
  SearchBar,
  box,
  chipClass,
  matches,
} from "./shared";

type Filter = "todos" | "esgotado" | "baixo" | "ok";

const filters: { key: Filter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "esgotado", label: "Esgotados" },
  { key: "baixo", label: "Estoque baixo" },
  { key: "ok", label: "Em estoque" },
];

const stateOf = (stock: number): Exclude<Filter, "todos"> =>
  stock === 0 ? "esgotado" : stock <= LOW_STOCK ? "baixo" : "ok";

export default function StockTab() {
  const { products, updateProduct } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategorySlug | "">("");
  const [filter, setFilter] = useState<Filter>("todos");

  const counts = {
    todos: products.length,
    esgotado: products.filter((p) => stateOf(p.stock) === "esgotado").length,
    baixo: products.filter((p) => stateOf(p.stock) === "baixo").length,
    ok: products.filter((p) => stateOf(p.stock) === "ok").length,
  };

  const list = products
    .filter(
      (p) =>
        matches(p, q) &&
        (!cat || p.category === cat) &&
        (filter === "todos" || stateOf(p.stock) === filter),
    )
    .sort((a, b) => a.stock - b.stock);

  const summary = [
    { label: "Esgotados", n: counts.esgotado, tone: "text-destructive" },
    { label: "Estoque baixo", n: counts.baixo, tone: "text-primary" },
    { label: "Em estoque", n: counts.ok, tone: "text-foreground" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {summary.map((s) => (
          <div key={s.label} className={box}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`mt-1 font-display text-3xl ${s.tone}`}>{s.n}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchBar value={q} onChange={setQ} />
        <CategorySelect value={cat} onChange={setCat} />
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} className={chipClass(filter === f.key)}>
            {f.label} ({counts[f.key]})
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((p) => {
          const state = stateOf(p.stock);
          return (
            <div key={p.id} className={`${box} flex items-center gap-3 p-3`}>
              <img src={p.image} alt="" className="size-12 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {categoryName(p.category)} · {p.brand}
                </p>
                <p
                  className={`text-xs ${state === "esgotado" ? "text-destructive" : state === "baixo" ? "text-primary" : "text-muted-foreground"}`}
                >
                  {state === "esgotado" ? "Esgotado" : state === "baixo" ? "Estoque baixo" : "OK"}
                </p>
              </div>
              <div className="flex items-center rounded-md ring-1 ring-border">
                <button
                  aria-label={`Diminuir estoque de ${p.name}`}
                  className="px-3 py-1 text-foreground"
                  onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 1) })}
                >
                  −
                </button>
                <NumberInput
                  ariaLabel={`Estoque de ${p.name}`}
                  value={p.stock}
                  className="w-14 border-0 text-center"
                  onCommit={(stock) => updateProduct(p.id, { stock: Math.round(stock) })}
                />
                <button
                  aria-label={`Aumentar estoque de ${p.name}`}
                  className="px-3 py-1 text-foreground"
                  onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {list.length === 0 && (
        <div className={`${box} text-center text-muted-foreground`}>
          Nenhum produto neste filtro.
        </div>
      )}
    </div>
  );
}
