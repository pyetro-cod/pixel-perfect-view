import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Store, Truck, Zap } from "lucide-react";
import StoreShell from "@/components/StoreShell";
import ProductCard from "@/components/ProductCard";
import { categories, categoryImage } from "@/data/catalog";
import { useStore } from "@/lib/store";
import hero from "@/assets/hero-barbell.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cariri Suplementos — Whey, creatina e pré-treino" },
      { name: "description", content: "Suplementos originais com preço justo. Retire na loja ou receba em casa." },
      { property: "og:title", content: "Cariri Suplementos — Whey, creatina e pré-treino" },
      { property: "og:description", content: "Suplementos originais com preço justo. Retire na loja ou receba em casa." },
    ],
  }),
  component: Home,
});

function Home() {
  const { products } = useStore();
  const featured = products.filter((p) => p.active && p.featured).slice(0, 8);
  const deals = products.filter((p) => p.active && p.oldPrice).slice(0, 4);

  return (
    <StoreShell>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Barra de musculação" className="absolute inset-0 h-full w-full object-cover opacity-40" width={1600} height={900} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Suplementação séria</span>
          <h1 className="mt-3 max-w-xl font-display text-5xl uppercase leading-[0.95] text-foreground sm:text-7xl">
            Treine forte. <span className="text-primary">Recupere melhor.</span>
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Whey, creatina, pré-treino e muito mais. Retire na loja ou receba em casa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/catalogo" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90">
              Ver catálogo <ArrowRight className="size-4" />
            </Link>
            <Link to="/catalogo" search={{ promo: true }} className="rounded-md border border-border bg-card px-6 py-3 font-semibold text-foreground">
              Ofertas da semana
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 text-sm sm:grid-cols-3">
          {[
            [Store, "Retire grátis na loja"],
            [Truck, "Entrega rápida na cidade"],
            [Zap, "Pedido confirmado pelo WhatsApp"],
          ].map(([Icon, t]) => {
            const I = Icon as typeof Store;
            return (
              <div key={t as string} className="flex items-center gap-3 text-foreground">
                <I className="size-5 text-primary" /> {t as string}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-3xl uppercase text-foreground">Categorias</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/catalogo" search={{ cat: c.slug }} className="group relative overflow-hidden rounded-xl ring-1 ring-border">
              <img src={categoryImage[c.slug]} alt={c.name} loading="lazy" className="aspect-[4/3] w-full object-cover opacity-60 transition group-hover:scale-105 group-hover:opacity-80" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background p-3 font-display text-lg uppercase text-foreground">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl uppercase text-foreground">Ofertas</h2>
          <Link to="/catalogo" search={{ promo: true }} className="text-sm text-primary">Ver todas</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {deals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="font-display text-3xl uppercase text-foreground">Mais vendidos</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </StoreShell>
  );
}
