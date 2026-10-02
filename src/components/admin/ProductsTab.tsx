import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { categories, categoryImage, categoryName, priceLabel, type CategorySlug } from "@/data/catalog";
import { useStore } from "@/lib/store";
import {
  CategorySelect,
  LOW_STOCK,
  NumberInput,
  SearchBar,
  box,
  chipClass,
  field,
  matches,
} from "./shared";

type Visibility = "todos" | "ativos" | "ocultos";

export default function ProductsTab() {
  const { products, updateProduct, removeProduct, resetCatalog } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CategorySlug | "">("");
  const [vis, setVis] = useState<Visibility>("todos");
  const [adding, setAdding] = useState(false);

  const list = products.filter(
    (p) =>
      matches(p, q) &&
      (!cat || p.category === cat) &&
      (vis === "todos" || (vis === "ativos" ? p.active : !p.active)),
  );
  const noPrice = products.filter((p) => p.price <= 0).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchBar value={q} onChange={setQ} />
        <CategorySelect value={cat} onChange={setCat} />
        <button
          onClick={() => setAdding((v) => !v)}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          {adding ? "Fechar" : "+ Novo produto"}
        </button>
      </div>

      {adding && <NewProductForm onDone={() => setAdding(false)} />}

      <div className="flex flex-wrap items-center gap-2">
        {(["todos", "ativos", "ocultos"] as const).map((v) => (
          <button key={v} onClick={() => setVis(v)} className={chipClass(vis === v)}>
            {v === "todos" ? "Todos" : v === "ativos" ? "Ativos" : "Ocultos"}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground">
          {list.length} de {products.length} produtos
          {noPrice > 0 && (
            <>
              {" · "}
              <span className="text-primary">{noPrice} sem preço</span>
            </>
          )}
        </span>
      </div>

      <div className={`${box} overflow-x-auto p-0`}>
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr className="border-b border-border">
              <th className="p-3">Produto</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Preço (R$)</th>
              <th className="p-3">Estoque</th>
              <th className="p-3">Ativo</th>
              <th className="p-3">Destaque</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr
                key={p.id}
                className={`border-b border-border last:border-0 ${p.active ? "" : "opacity-60"}`}
              >
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="size-10 rounded object-cover" />
                    <div className="min-w-0">
                      <p className="max-w-[16rem] truncate text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.brand}
                        {p.details && ` · ${p.details}`}
                        {p.flavor && ` · ${p.flavor}`}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{categoryName(p.category)}</td>
                <td className="p-3">
                  <NumberInput
                    ariaLabel={`Preço de ${p.name}`}
                    value={p.price}
                    step={0.1}
                    onCommit={(price) =>
                      updateProduct(p.id, { price, ...(p.oldPrice ? { oldPrice: undefined } : {}) })
                    }
                  />
                  {p.price <= 0 && <p className="mt-1 text-[11px] text-primary">{priceLabel(p)}</p>}
                </td>
                <td className="p-3">
                  <NumberInput
                    ariaLabel={`Estoque de ${p.name}`}
                    value={p.stock}
                    className={`w-20 ${p.stock === 0 ? "text-destructive" : p.stock <= LOW_STOCK ? "text-primary" : ""}`}
                    onCommit={(stock) => updateProduct(p.id, { stock: Math.round(stock) })}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    aria-label={`Ativar ${p.name}`}
                    checked={p.active}
                    onChange={(e) => updateProduct(p.id, { active: e.target.checked })}
                    className="accent-primary"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="checkbox"
                    aria-label={`Destacar ${p.name}`}
                    checked={p.featured}
                    onChange={(e) => updateProduct(p.id, { featured: e.target.checked })}
                    className="accent-primary"
                  />
                </td>
                <td className="p-3">
                  <button
                    onClick={() => {
                      if (!window.confirm(`Remover "${p.name}" da loja?`)) return;
                      removeProduct(p.id);
                      toast("Produto removido");
                    }}
                    className="text-destructive"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-center text-muted-foreground">
                  Nenhum produto encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between gap-3 text-xs text-muted-foreground">
        <p>As alterações ficam salvas neste navegador.</p>
        <button
          onClick={() => {
            if (!window.confirm("Voltar todos os produtos ao estado original do código?")) return;
            resetCatalog();
            toast("Catálogo restaurado");
          }}
          className="underline hover:text-foreground"
        >
          Restaurar catálogo original
        </button>
      </div>
    </div>
  );
}

function NewProductForm({ onDone }: { onDone: () => void }) {
  const { addProduct } = useStore();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<CategorySlug>(categories[0]!.slug);
  const [flavor, setFlavor] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const valid = name.trim().length > 1 && brand.trim().length > 0;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    addProduct({
      name: name.trim(),
      brand: brand.trim(),
      category,
      ...(flavor.trim() ? { flavor: flavor.trim() } : {}),
      ...(details.trim() ? { details: details.trim() } : {}),
      price: Math.max(0, Number(price.replace(",", ".")) || 0),
      image: categoryImage[category],
      stock: Math.max(0, Math.round(Number(stock) || 0)),
      description: [name.trim(), flavor.trim() && `Sabor: ${flavor.trim()}`, details.trim()]
        .filter(Boolean)
        .join(" · "),
      featured: false,
      active: true,
    });
    toast.success("Produto adicionado", { description: name.trim() });
    onDone();
  };

  return (
    <form onSubmit={submit} className={`${box} grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
      <input
        className={`${field} lg:col-span-2`}
        placeholder="Nome do produto *"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={field}
        placeholder="Marca *"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />
      <select
        className={field}
        value={category}
        onChange={(e) => setCategory(e.target.value as CategorySlug)}
      >
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        className={field}
        placeholder="Sabor (opcional)"
        value={flavor}
        onChange={(e) => setFlavor(e.target.value)}
      />
      <input
        className={field}
        placeholder="Peso / apresentação (ex.: 900g)"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <input
        className={field}
        type="number"
        step="0.1"
        min="0"
        placeholder="Preço (R$)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className={field}
        type="number"
        min="0"
        placeholder="Estoque"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <button
        disabled={!valid}
        className="rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50 sm:col-span-2 lg:col-span-4"
      >
        Adicionar produto
      </button>
    </form>
  );
}
