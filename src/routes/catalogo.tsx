import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import StoreShell from "@/components/StoreShell";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/catalog";
import { useStore } from "@/lib/store";

const search = z.object({
  cat: z.string().optional(),
  promo: z.boolean().optional(),
  q: z.string().optional(),
  sort: z.enum(["relevancia", "menor", "maior", "novos"]).optional(),
});

export const Route = createFileRoute("/catalogo")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Catálogo — Cariri Suplementos" },
      { name: "description", content: "Todos os suplementos: whey, creatina, pré-treino, vitaminas e acessórios." },
      { property: "og:title", content: "Catálogo — Cariri Suplementos" },
      { property: "og:description", content: "Todos os suplementos: whey, creatina, pré-treino, vitaminas e acessórios." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { cat, promo, q = "", sort = "relevancia" } = Route.useSearch();
  const navigate = useNavigate({ from: "/catalogo" });
  const { products } = useStore();
  const set = (patch: Record<string, unknown>) =>
    navigate({ search: (s) => ({ ...s, ...patch }), replace: true });

  let list = products.filter(
    (p) =>
      p.active &&
      (!cat || p.category === cat) &&
      (!promo || p.oldPrice) &&
      (!q || `${p.name} ${p.brand}`.toLowerCase().includes(q.toLowerCase())),
  );
  if (sort === "menor") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "maior") list = [...list].sort((a, b) => b.price - a.price);
  if (sort === "novos") list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (sort === "relevancia") list = [...list].sort((a, b) => b.sold - a.sold);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground"}`;

  return (
    <StoreShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-4xl uppercase text-foreground">{promo ? "Ofertas" : "Catálogo"}</h1>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={q}
            onChange={(e) => set({ q: e.target.value || undefined })}
            placeholder="Buscar produto ou marca…"
            className="flex-1 rounded-md border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={sort}
            onChange={(e) => set({ sort: e.target.value })}
            className="rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground"
          >
            <option value="relevancia">Destaques</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
            <option value="novos">Novidades</option>
          </select>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          <button className={chip(!cat)} onClick={() => set({ cat: undefined })}>Todos</button>
          {categories.map((c) => (
            <button key={c.slug} className={chip(cat === c.slug)} onClick={() => set({ cat: c.slug })}>{c.name}</button>
          ))}
          <button className={chip(!!promo)} onClick={() => set({ promo: promo ? undefined : true })}>Em promoção</button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{list.length} produtos</p>
        {list.length === 0 ? (
          <div className="mt-10 rounded-xl bg-card p-10 text-center text-muted-foreground ring-1 ring-border">Nenhum produto encontrado.</div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </StoreShell>
  );
}
