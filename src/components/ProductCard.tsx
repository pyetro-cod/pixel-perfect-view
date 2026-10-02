import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { formatBRL, priceLabel, type Product } from "@/data/catalog";
import { discountPct, stockStatus, useStore } from "@/lib/store";

const toneClass = {
  ok: "text-[oklch(0.78_0.16_155)]",
  low: "text-[oklch(0.81_0.15_80)]",
  out: "text-muted-foreground",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, setCartOpen } = useStore();
  const status = stockStatus(product.stock);
  const off = discountPct(product);

  return (
    <article className="group flex flex-col rounded-xl bg-card p-3 ring-1 ring-border transition-transform hover:-translate-y-1">
      <Link to="/produto/$id" params={{ id: product.id }} className="relative block">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="aspect-square w-full rounded-lg bg-secondary object-cover"
        />
        {off > 0 && (
          <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
            -{off}%
          </span>
        )}
      </Link>
      <div className="mt-3 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold uppercase tracking-wide text-primary">
            {product.brand}
          </span>
          {product.flavor && (
            <span className="shrink-0 text-[11px] text-muted-foreground">{product.flavor}</span>
          )}
        </div>
        <Link to="/produto/$id" params={{ id: product.id }}>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
        </Link>
        {product.details && <p className="mt-1 text-xs text-muted-foreground">{product.details}</p>}
        <div className="mt-3 flex items-end gap-2">
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatBRL(product.oldPrice)}
            </span>
          )}
          <span className="font-display text-2xl leading-none text-foreground">
            {priceLabel(product)}
          </span>
        </div>
        <span className={`mt-2 text-[11px] font-medium ${toneClass[status.tone]}`}>
          ● {status.label}
        </span>
        <button
          disabled={product.stock === 0}
          onClick={() => {
            addToCart(product.id);
            setCartOpen(true);
            toast.success("Produto adicionado ao carrinho", { description: product.name });
          }}
          className={`mt-3 w-full rounded-md py-2.5 text-sm font-semibold transition-colors ${
            product.stock === 0
              ? "cursor-not-allowed bg-secondary text-muted-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {product.stock === 0 ? "Indisponível" : "Adicionar"}
        </button>
      </div>
    </article>
  );
}
