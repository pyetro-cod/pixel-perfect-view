import { Package, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { getProductImage } from "@/lib/product-images";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: Props) {
  const image = getProductImage(product.id);
  const details = [product.flavor, product.weight, product.presentation, product.color]
    .filter(Boolean)
    .join(" • ");

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-900">
        {image ? (
          <img
            src={image}
            alt={`${product.name}${product.flavor ? ` - ${product.flavor}` : ""}`}
            loading="lazy"
            className="h-full w-full object-cover object-[50%_70%]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-600">
            <Package className="h-16 w-16" aria-hidden />
          </div>
        )}
        {product.tags?.map((tag, i) => (
          <span
            key={tag}
            style={{ top: `${0.75 + i * 1.75}rem` }}
            className="absolute left-3 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
          {product.category}
        </span>
        <p className="text-xs uppercase tracking-wide text-neutral-500">{product.brand}</p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900">
          {product.name}
        </h3>
        {details && <p className="text-xs text-neutral-500">{details}</p>}

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <p className="text-lg font-bold text-neutral-900">
            {product.price !== null ? brl.format(product.price) : "Consulte o preço"}
          </p>
          <button
            type="button"
            onClick={() => onAdd(product)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </article>
  );
}