import { Link } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useStore } from "@/lib/store";
import { WHATSAPP_URL, formatBRL } from "@/data/catalog";
import CartDrawer from "@/components/CartDrawer";
import logoAsset from "@/assets/cariri-logo.png.asset.json";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src={logoAsset.url}
        alt="Cariri Suplementos"
        className="size-9 shrink-0 rounded-md object-cover"
      />
      <span className="font-display text-xl tracking-wide text-foreground">
        CARIRI<span className="text-primary">.</span>
      </span>
    </Link>
  );
}

function SiteHeader() {
  const { cartCount, setCartOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link to="/catalogo" className="transition-colors hover:text-foreground">
              Catálogo
            </Link>
            <Link
              to="/catalogo"
              search={{ promo: true }}
              className="transition-colors hover:text-foreground"
            >
              Ofertas
            </Link>
            <Link to="/admin" className="transition-colors hover:text-foreground">
              Painel
            </Link>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/catalogo"
            aria-label="Buscar produtos"
            className="grid size-9 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          >
            <Search className="size-4" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4"
          >
            <ShoppingCart className="size-4 shrink-0" />
            <span className="hidden sm:inline">Carrinho</span>
            <span
              key={cartCount}
              className="cart-pop grid h-5 min-w-5 place-items-center rounded-full bg-background px-1 text-xs font-bold text-primary"
            >
              {cartCount}
            </span>
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-card text-muted-foreground md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="border-t border-border bg-card px-4 py-3 text-sm md:hidden">
          <Link
            to="/catalogo"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-foreground"
          >
            Catálogo
          </Link>
          <Link
            to="/catalogo"
            search={{ promo: true }}
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-foreground"
          >
            Ofertas
          </Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)} className="block py-2 text-foreground">
            Painel administrativo
          </Link>
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row">
        <span className="font-display text-lg tracking-wide text-foreground">
          CARIRI<span className="text-primary">.</span> SUPLEMENTOS
        </span>
        <span className="text-center text-xs text-muted-foreground">
          Protótipo de demonstração — produtos, preços e pedidos são fictícios.
        </span>
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground shadow-lg transition-transform hover:-translate-y-0.5 md:bottom-6"
    >
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[oklch(0.78_0.16_155)] text-xs font-bold text-background">
        W
      </span>
      <span className="hidden sm:inline">Falar com a loja</span>
    </a>
  );
}

function StickyCartBar() {
  const { cartCount, total, setCartOpen } = useStore();
  if (cartCount === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-6 min-w-6 shrink-0 place-items-center rounded-full bg-primary px-1.5 text-xs font-bold text-primary-foreground">
            {cartCount}
          </span>
          <span className="truncate text-sm text-muted-foreground">
            {cartCount} {cartCount === 1 ? "item" : "itens"} ·{" "}
            <span className="font-semibold text-foreground">{formatBRL(total)}</span>
          </span>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="shrink-0 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}

export default function StoreShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFab />
      <StickyCartBar />
      <CartDrawer />
      <div className="h-16 md:hidden" />
    </div>
  );
}
