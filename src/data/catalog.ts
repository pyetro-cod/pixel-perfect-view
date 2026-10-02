import whey from "@/assets/prod-whey.jpg";
import creatina from "@/assets/prod-creatina.jpg";
import hipercalorico from "@/assets/prod-hipercalorico.jpg";
import vitamina from "@/assets/prod-vitamina.jpg";
import barra from "@/assets/prod-barra.jpg";
import acessorio from "@/assets/prod-acessorio.jpg";
import { products as catalogData, type Category } from "@/data/products";
import { getProductImage } from "@/lib/product-images";

export type CategorySlug =
  | "proteina"
  | "creatina"
  | "pasta-de-amendoim"
  | "barra-de-proteina"
  | "multivitaminico"
  | "termogenico"
  | "acessorios";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  flavor?: string;
  details?: string; // peso, apresentação ou cor
  tags?: string[];
  price: number; // 0 = preço ainda não definido ("Consulte o preço")
  oldPrice?: number | undefined;
  image: string;
  stock: number;
  description: string;
  featured: boolean;
  active: boolean;
  sold: number;
  createdAt: string;
};

const categoryBySlug: Record<CategorySlug, Category> = {
  proteina: "Proteína",
  creatina: "Creatina",
  "pasta-de-amendoim": "Pasta de Amendoim",
  "barra-de-proteina": "Barra de Proteína",
  multivitaminico: "Multivitamínico",
  termogenico: "Termogênico",
  acessorios: "Acessórios",
};

const slugByCategory = Object.fromEntries(
  Object.entries(categoryBySlug).map(([slug, name]) => [name, slug]),
) as Record<Category, CategorySlug>;

export const categories: { slug: CategorySlug; name: string }[] = (
  Object.entries(categoryBySlug) as [CategorySlug, Category][]
).map(([slug, name]) => ({ slug, name }));

export const categoryName = (slug: CategorySlug) => categoryBySlug[slug] ?? slug;

// Foto genérica usada nas categorias e nos produtos que ainda não têm foto própria.
export const categoryImage: Record<CategorySlug, string> = {
  proteina: whey,
  creatina: creatina,
  "pasta-de-amendoim": hipercalorico,
  "barra-de-proteina": barra,
  multivitaminico: vitamina,
  termogenico: vitamina,
  acessorios: acessorio,
};

// Produtos em destaque na home (ids de src/data/products.ts).
const FEATURED_IDS = new Set(["01", "02", "04", "18", "19", "21", "07", "11"]);

export const products: Product[] = catalogData.map((p) => {
  const slug = slugByCategory[p.category];
  const details = [p.weight, p.presentation, p.color].filter(Boolean).join(" • ");
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: slug,
    ...(p.flavor ? { flavor: p.flavor } : {}),
    ...(details ? { details } : {}),
    ...(p.tags ? { tags: p.tags } : {}),
    price: p.price ?? 0,
    image: getProductImage(p.id) ?? categoryImage[slug],
    stock: 10, // TODO: informar estoque real
    description: [p.subcategory, p.flavor && `Sabor: ${p.flavor}`, details]
      .filter(Boolean)
      .join(" · "),
    featured: FEATURED_IDS.has(p.id),
    active: true,
    sold: 0,
    createdAt: "2026-10-01",
  };
});

export type OrderStatus = "NOVO" | "CONFIRMADO" | "EM PREPARAÇÃO" | "PRONTO" | "CONCLUÍDO";

export const orderStatuses: OrderStatus[] = [
  "NOVO",
  "CONFIRMADO",
  "EM PREPARAÇÃO",
  "PRONTO",
  "CONCLUÍDO",
];

export type Order = {
  id: string;
  customer: string;
  phone: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  delivery: "Retirar na loja" | "Receber em casa";
  createdAt: string;
};

export const initialOrders: Order[] = [
  {
    id: "1048",
    customer: "João Silva",
    phone: "(88) 90000-0000",
    items: [
      { name: "Whey Isolado 900g", qty: 1, price: 164.9 },
      { name: "Creatina 300g", qty: 1, price: 76.9 },
    ],
    total: 241.8,
    status: "NOVO",
    delivery: "Retirar na loja",
    createdAt: "2026-03-18",
  },
  {
    id: "1047",
    customer: "Marina Costa",
    phone: "(88) 90000-0000",
    items: [{ name: "Pré-Treino 400g", qty: 2, price: 97.9 }],
    total: 195.8,
    status: "CONFIRMADO",
    delivery: "Receber em casa",
    createdAt: "2026-03-18",
  },
  {
    id: "1046",
    customer: "Rafael Nunes",
    phone: "(88) 90000-0000",
    items: [
      { name: "Hipercalórico 3kg", qty: 1, price: 149.9 },
      { name: "Coqueteleira 600ml", qty: 1, price: 29.9 },
    ],
    total: 179.8,
    status: "EM PREPARAÇÃO",
    delivery: "Retirar na loja",
    createdAt: "2026-03-17",
  },
  {
    id: "1045",
    customer: "Beatriz Lima",
    phone: "(88) 90000-0000",
    items: [{ name: "Multivitamínico 60 cápsulas", qty: 3, price: 54.9 }],
    total: 164.7,
    status: "PRONTO",
    delivery: "Receber em casa",
    createdAt: "2026-03-17",
  },
  {
    id: "1044",
    customer: "Diego Alves",
    phone: "(88) 90000-0000",
    items: [{ name: "Whey Concentrado 900g", qty: 1, price: 119.9 }],
    total: 119.9,
    status: "CONCLUÍDO",
    delivery: "Retirar na loja",
    createdAt: "2026-03-16",
  },
];

export const salesByMonth = [
  { month: "Out", vendas: 12400 },
  { month: "Nov", vendas: 15800 },
  { month: "Dez", vendas: 21300 },
  { month: "Jan", vendas: 17600 },
  { month: "Fev", vendas: 19900 },
  { month: "Mar", vendas: 24500 },
];

export const WHATSAPP_URL = "https://wa.me/5588000000000";

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const priceLabel = (p: { price: number }) =>
  p.price > 0 ? formatBRL(p.price) : "Consulte o preço";
