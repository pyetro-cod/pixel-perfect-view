import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import StoreShell from "@/components/StoreShell";
import ProductCard from "@/components/ProductCard";
import { categoryName, formatBRL, products as seed } from "@/data/catalog";
import { discountPct, stockStatus, useStore } from "@/lib/store";

export const Route = createFileRoute("/produto/$id")({
  head: ({ params }) => {
    const p = seed.find((x) => x.id === params.id);
    const title = p ? `${p.name} — Cariri Suplementos` : "Produto — Cariri Suplementos";
    const desc = p?.description ?? "Detalhes do produto.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { products, addToCart, setCartOpen } = useStore();
  const [qty, setQty] = useState(1);
  const p = products.find((x) => x.id === id);

  if (!p)
    return (
      <StoreShell>
        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="font-display text-3xl uppercase text-foreground">Produto não encontrado</h1>
          <Link to="/catalogo" className="mt-4 inline-block text-primary">Voltar ao catálogo</Link>
        </div>
      </StoreShell>
    );

  const status = stockStatus(p.stock);
  const off = discountPct(p);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id && x.active).slice(0, 4);

  return (
    <StoreShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav className="text-sm text-muted-foreground">
          <Link to="/catalogo">Catálogo</Link> / <Link to="/catalogo" search={{ cat: p.category }}>{categoryName(p.category)}</Link>
        </nav>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="relative">
            <img src={p.image} alt={p.name} className="aspect-square w-full rounded-2xl bg-card object-cover ring-1 ring-border" />
            {off > 0 && <span className="absolute left-4 top-4 rounded-md bg-primary px-3 py-1 font-bold text-primary-foreground">-{off}%</span>}
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-primary">{p.brand}</span>
            <h1 className="mt-2 font-display text-4xl uppercase leading-tight text-foreground">{p.name}</h1>
            {p.flavor && <p className="mt-1 text-muted-foreground">Sabor: {p.flavor}</p>}
            <div className="mt-6 flex items-end gap-3">
              {p.oldPrice && <span className="text-muted-foreground line-through">{formatBRL(p.oldPrice)}</span>}
              <span className="font-display text-5xl text-foreground">{formatBRL(p.price)}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">ou 3x de {formatBRL(p.price / 3)} sem juros</p>
            <p className="mt-4 text-sm font-medium text-foreground">● {status.label} {p.stock > 0 && `(${p.stock} un.)`}</p>
            <div className="mt-6 flex gap-3">
              <div className="flex items-center rounded-md ring-1 ring-border">
                <button className="px-4 py-3 text-foreground" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="w-8 text-center text-foreground">{qty}</span>
                <button className="px-4 py-3 text-foreground" onClick={() => setQty(Math.min(p.stock, qty + 1))}>+</button>
              </div>
              <button
                disabled={p.stock === 0}
                onClick={() => {
                  addToCart(p.id, qty);
                  setCartOpen(true);
                  toast.success("Adicionado ao carrinho", { description: p.name });
                }}
                className="flex-1 rounded-md bg-primary py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground"
              >
                {p.stock === 0 ? "Indisponível" : "Adicionar ao carrinho"}
              </button>
            </div>
            <div className="mt-8 rounded-xl bg-card p-5 ring-1 ring-border">
              <h2 className="font-semibold text-foreground">Descrição</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl uppercase text-foreground">Você também pode gostar</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {related.map((r) => <ProductCard key={r.id} product={r} />)}
            </div>
          </section>
        )}
      </div>
    </StoreShell>
  );
}
