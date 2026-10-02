import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { formatBRL, orderStatuses, salesByMonth, type OrderStatus } from "@/data/catalog";
import { useStore } from "@/lib/store";
import AdminGate from "@/components/admin/AdminGate";
import ProductsTab from "@/components/admin/ProductsTab";
import StockTab from "@/components/admin/StockTab";
import PromosTab from "@/components/admin/PromosTab";
import { LOW_STOCK, box } from "@/components/admin/shared";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel — Cariri Suplementos" },
      { name: "description", content: "Painel administrativo: vendas, produtos, estoque, promoções e pedidos." },
      { property: "og:title", content: "Painel — Cariri Suplementos" },
      { property: "og:description", content: "Painel administrativo da loja." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const tabs = ["Visão geral", "Produtos", "Estoque", "Promoções", "Pedidos"] as const;
type Tab = (typeof tabs)[number];

function AdminPage() {
  return (
    <AdminGate>
      <Admin />
    </AdminGate>
  );
}

function Admin() {
  const [tab, setTab] = useState<Tab>("Visão geral");
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <span className="font-display text-xl tracking-wide text-foreground">CARIRI<span className="text-primary">.</span> PAINEL</span>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Ver loja →</Link>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`shrink-0 border-b-2 px-4 py-3 text-sm ${tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>{t}</button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        {tab === "Visão geral" && <Overview />}
        {tab === "Produtos" && <ProductsTab />}
        {tab === "Estoque" && <StockTab />}
        {tab === "Promoções" && <PromosTab />}
        {tab === "Pedidos" && <Orders />}
      </main>
    </div>
  );
}

function Overview() {
  const { orders, products } = useStore();
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const low = products.filter((p) => p.stock <= LOW_STOCK).length;
  const max = Math.max(...salesByMonth.map((m) => m.vendas));
  const top = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["Faturamento (pedidos)", formatBRL(revenue)],
          ["Pedidos", String(orders.length)],
          ["Novos pedidos", String(orders.filter((o) => o.status === "NOVO").length)],
          ["Estoque baixo", String(low)],
        ].map(([l, v]) => (
          <div key={l} className={box}>
            <p className="text-xs text-muted-foreground">{l}</p>
            <p className="mt-2 font-display text-3xl text-foreground">{v}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <div className={box}>
          <h2 className="font-semibold text-foreground">Vendas por mês</h2>
          <div className="mt-6 flex h-48 items-end gap-3">
            {salesByMonth.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-primary" style={{ height: `${(m.vendas / max) * 100}%` }} title={formatBRL(m.vendas)} />
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={box}>
          <h2 className="font-semibold text-foreground">Mais vendidos</h2>
          <ol className="mt-4 space-y-3 text-sm">
            {top.map((p, i) => (
              <li key={p.id} className="flex justify-between gap-2">
                <span className="truncate text-foreground">{i + 1}. {p.name}</span>
                <span className="shrink-0 text-muted-foreground">{p.sold}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function Orders() {
  const { orders, setOrderStatus } = useStore();
  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className={box}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-foreground">#{o.id} · {o.customer}</p>
              <p className="text-xs text-muted-foreground">{o.phone} · {o.delivery} · {o.createdAt}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display text-xl text-foreground">{formatBRL(o.total)}</span>
              <select value={o.status} onChange={(e) => { setOrderStatus(o.id, e.target.value as OrderStatus); toast.success(`Pedido #${o.id}: ${e.target.value}`); }} className="rounded border border-border bg-background px-2 py-1 text-sm text-foreground">
                {orderStatuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <ul className="mt-3 text-sm text-muted-foreground">
            {o.items.map((i) => <li key={i.name}>{i.qty}× {i.name} — {formatBRL(i.price * i.qty)}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
