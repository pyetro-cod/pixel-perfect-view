import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { formatBRL } from "@/data/catalog";
import { useStore } from "@/lib/store";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartLines, subtotal, savings, total, setQty, removeFromCart } =
    useStore();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={() => setCartOpen(false)}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="font-display text-xl tracking-wide text-foreground">SEU CARRINHO</h2>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Fechar carrinho"
            className="grid size-8 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {cartLines.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Seu carrinho está vazio.
            </p>
          )}
          {cartLines.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex gap-3 rounded-lg border border-border bg-background p-3"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={80}
                height={80}
                className="size-16 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      aria-label="Diminuir"
                      onClick={() => setQty(product.id, qty - 1)}
                      className="grid size-7 place-items-center text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                    <button
                      aria-label="Aumentar"
                      onClick={() => setQty(product.id, qty + 1)}
                      className="grid size-7 place-items-center text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {formatBRL(product.price * qty)}
                  </span>
                  <button
                    aria-label="Remover"
                    onClick={() => removeFromCart(product.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="border-t border-border px-4 py-4">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatBRL(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Descontos</span>
              <span className="text-primary">-{formatBRL(savings)}</span>
            </div>
            <div className="flex items-end justify-between pt-2">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-2xl leading-none text-foreground">
                {formatBRL(total)}
              </span>
            </div>
          </div>
          <Link
            to="/checkout"
            onClick={() => setCartOpen(false)}
            aria-disabled={cartLines.length === 0}
            className={`mt-4 block rounded-md py-3 text-center text-sm font-semibold ${
              cartLines.length === 0
                ? "pointer-events-none bg-secondary text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            FINALIZAR PEDIDO
          </Link>
          <button
            onClick={() => setCartOpen(false)}
            className="mt-2 w-full rounded-md border border-border py-2.5 text-sm font-semibold text-foreground"
          >
            Continuar comprando
          </button>
        </footer>
      </aside>
    </div>
  );
}
