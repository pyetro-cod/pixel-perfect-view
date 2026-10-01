import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { products, SECTION_ORDER, type Category, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

const ALL = "all";

export function Catalog() {
  const [category, setCategory] = useState<Category | typeof ALL>(ALL);
  const [brand, setBrand] = useState<string>(ALL);
  const [cart, setCart] = useState<Record<string, number>>({});

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [],
  );

  const brands = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .filter((p) => category === ALL || p.category === category)
            .map((p) => p.brand),
        ),
      ).sort((a, b) => a.localeCompare(b, "pt-BR")),
    [category],
  );

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === ALL || p.category === category) &&
          (brand === ALL || p.brand === brand),
      ),
    [category, brand],
  );

  const grouped = useMemo(
    () =>
      SECTION_ORDER.map((section) => ({
        section,
        items: filtered.filter((p) => p.section === section),
      })).filter((g) => g.items.length > 0),
    [filtered],
  );

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleCategory = (value: Category | typeof ALL) => {
    setCategory(value);
    setBrand(ALL); // evita combinação categoria+marca sem resultados
  };

  const handleAdd = (product: Product) =>
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }));

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition ${
      active
        ? "border-neutral-900 bg-neutral-900 text-white"
        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500"
    }`;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Catálogo</h1>
        <div className="relative" aria-label={`Carrinho com ${cartCount} itens`}>
          <ShoppingCart className="h-6 w-6 text-neutral-900" aria-hidden />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-semibold text-white">
              {cartCount}
            </span>
          )}
        </div>
      </header>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          <button type="button" className={chip(category === ALL)} onClick={() => handleCategory(ALL)}>
            Todas
          </button>
          {categories.map((c) => (
            <button key={c} type="button" className={chip(category === c)} onClick={() => handleCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-neutral-700">
          Marca
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm"
          >
            <option value={ALL}>Todas as marcas</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
      </div>

      {grouped.length === 0 ? (
        <p className="py-16 text-center text-neutral-500">Nenhum produto encontrado.</p>
      ) : (
        grouped.map(({ section, items }) => (
          <div key={section} className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">{section}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={handleAdd} />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}