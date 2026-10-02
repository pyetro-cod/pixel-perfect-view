import { useState } from "react";
import { formatBRL, priceLabel, type CategorySlug } from "@/data/catalog";
import { discountPct, useStore } from "@/lib/store";
import { CategorySelect, SearchBar, box, chipClass, matches } from "./shared";

const PRESETS = [0, 10, 15, 20, 25, 30, 40];

export default function PromosTab() {
  const { products, updateProduct } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategorySlug | "">("");
  const [onlyPromo, setOnlyPromo] = useState(false);

  const list = products.filter(
    (p) => matches(p, q) && (!cat || p.category === cat) && (!onlyPromo || p.oldPrice),
  );
  const active = products.filter((p) => p.oldPrice).length;

  const applyDiscount = (id: string, pct: number) => {
    const p = products.find((x) => x.id === id);
    if (!p || p.price <= 0) return;
    const base = p.oldPrice ?? p.price;
    updateProduct(
      id,
      pct === 0
        ? { price: base, oldPrice: undefined }
        : { oldPrice: base, price: Math.round(base * (1 - pct / 100) * 100) / 100 },
    );
  };

  // Aplica o mesmo desconto a todos os produtos da lista filtrada.
  const applyToList = (pct: number) =>
    list.filter((p) => p.price > 0).forEach((p) => applyDiscount(p.id, pct));

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchBar value={q} onChange={setQ} />
        <CategorySelect value={cat} onChange={setCat} />
        <button onClick={() => setOnlyPromo((v) => !v)} className={chipClass(onlyPromo)}>
          Em promoção ({active})
        </button>
      </div>

      <div className={`${box} flex flex-wrap items-center gap-3 p-3 text-sm`}>
        <span className="text-muted-foreground">Aplicar a todos os {list.length} da lista:</span>
        <select
          defaultValue=""
          onChange={(e) => {
            if (e.target.value === "") return;
            applyToList(Number(e.target.value));
            e.target.value = "";
          }}
          className="rounded border border-border bg-background px-2 py-1 text-foreground"
        >
          <option value="">Escolher desconto…</option>
          {PRESETS.map((v) => (
            <option key={v} value={v}>
              {v === 0 ? "Remover promoções" : `-${v}%`}
            </option>
          ))}
        </select>
        <span className="text-xs text-muted-foreground">Produtos sem preço são ignorados.</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((p) => {
          const off = discountPct(p);
          const hasPrice = p.price > 0;
          return (
            <div key={p.id} className={`${box} flex items-center gap-3 p-3`}>
              <img src={p.image} alt="" className="size-12 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.oldPrice && <span className="mr-1 line-through">{formatBRL(p.oldPrice)}</span>}
                  {priceLabel(p)} {off > 0 && <span className="text-primary">(-{off}%)</span>}
                </p>
              </div>
              <select
                aria-label={`Desconto de ${p.name}`}
                value={off}
                disabled={!hasPrice}
                title={hasPrice ? undefined : "Defina o preço do produto primeiro"}
                onChange={(e) => applyDiscount(p.id, Number(e.target.value))}
                className="rounded border border-border bg-background px-2 py-1 text-sm text-foreground disabled:opacity-50"
              >
                {PRESETS.includes(off) ? null : <option value={off}>-{off}%</option>}
                {PRESETS.map((v) => (
                  <option key={v} value={v}>
                    {v === 0 ? "Sem promoção" : `-${v}%`}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
      {list.length === 0 && (
        <div className={`${box} text-center text-muted-foreground`}>Nenhum produto encontrado.</div>
      )}
    </div>
  );
}
