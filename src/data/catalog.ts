import whey from "@/assets/prod-whey.jpg";
import creatina from "@/assets/prod-creatina.jpg";
import pretreino from "@/assets/prod-pretreino.jpg";
import hipercalorico from "@/assets/prod-hipercalorico.jpg";
import vitamina from "@/assets/prod-vitamina.jpg";
import barra from "@/assets/prod-barra.jpg";
import acessorio from "@/assets/prod-acessorio.jpg";

export type CategorySlug =
  | "whey-protein"
  | "creatina"
  | "pre-treino"
  | "hipercaloricos"
  | "vitaminas"
  | "termogenicos"
  | "barras-e-snacks"
  | "acessorios";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  flavor?: string;
  price: number;
  oldPrice?: number | undefined;
  image: string;
  stock: number;
  description: string;
  featured: boolean;
  active: boolean;
  sold: number;
  createdAt: string;
};

export const categories: { slug: CategorySlug; name: string }[] = [
  { slug: "whey-protein", name: "Whey Protein" },
  { slug: "creatina", name: "Creatina" },
  { slug: "pre-treino", name: "Pré-Treino" },
  { slug: "hipercaloricos", name: "Hipercalóricos" },
  { slug: "vitaminas", name: "Vitaminas" },
  { slug: "termogenicos", name: "Termogênicos" },
  { slug: "barras-e-snacks", name: "Barras e Snacks" },
  { slug: "acessorios", name: "Acessórios" },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

export const categoryImage: Record<CategorySlug, string> = {
  "whey-protein": whey,
  creatina: creatina,
  "pre-treino": pretreino,
  hipercaloricos: hipercalorico,
  vitaminas: vitamina,
  termogenicos: vitamina,
  "barras-e-snacks": barra,
  acessorios: acessorio,
};

export const products: Product[] = [
  {
    id: "whey-isolado-900",
    name: "Whey Isolado 900g",
    brand: "IronForge",
    category: "whey-protein",
    flavor: "Chocolate",
    price: 164.9,
    oldPrice: 219.9,
    image: whey,
    stock: 32,
    description:
      "Proteína isolada de alta pureza com 27g de proteína por dose e absorção rápida. Ideal para o pós-treino.",
    featured: true,
    active: true,
    sold: 212,
    createdAt: "2026-02-10",
  },
  {
    id: "whey-concentrado-900",
    name: "Whey Concentrado 900g",
    brand: "IronForge",
    category: "whey-protein",
    flavor: "Baunilha",
    price: 119.9,
    oldPrice: 149.9,
    image: whey,
    stock: 4,
    description:
      "Whey concentrado com 24g de proteína por dose, ótimo custo-benefício para o dia a dia.",
    featured: true,
    active: true,
    sold: 341,
    createdAt: "2026-01-22",
  },
  {
    id: "whey-3w-1kg",
    name: "Whey 3W 1kg",
    brand: "NutriPeak",
    category: "whey-protein",
    flavor: "Morango",
    price: 189.9,
    image: whey,
    stock: 17,
    description:
      "Blend de três fontes proteicas com liberação gradual: isolado, concentrado e hidrolisado.",
    featured: false,
    active: true,
    sold: 98,
    createdAt: "2026-03-02",
  },
  {
    id: "caseina-900",
    name: "Caseína Micelar 900g",
    brand: "NutriPeak",
    category: "whey-protein",
    flavor: "Cookies",
    price: 159.9,
    image: whey,
    stock: 9,
    description: "Absorção lenta, indicada para o período noturno e longos intervalos sem refeição.",
    featured: false,
    active: true,
    sold: 54,
    createdAt: "2026-02-18",
  },
  {
    id: "creatina-300",
    name: "Creatina Monohidratada 300g",
    brand: "PeakLab",
    category: "creatina",
    flavor: "Sem sabor",
    price: 76.9,
    oldPrice: 89.9,
    image: creatina,
    stock: 18,
    description: "Creatina monohidratada pura, 3g por dose. Força, volume e recuperação.",
    featured: true,
    active: true,
    sold: 402,
    createdAt: "2026-01-05",
  },
  {
    id: "creatina-150",
    name: "Creatina Monohidratada 150g",
    brand: "PeakLab",
    category: "creatina",
    flavor: "Sem sabor",
    price: 44.9,
    image: creatina,
    stock: 26,
    description: "Versão compacta da creatina monohidratada pura, 50 doses.",
    featured: false,
    active: true,
    sold: 176,
    createdAt: "2026-02-01",
  },
  {
    id: "creatina-creapure-300",
    name: "Creatina Creapure 300g",
    brand: "LabForce",
    category: "creatina",
    flavor: "Sem sabor",
    price: 129.9,
    image: creatina,
    stock: 0,
    description: "Matéria-prima alemã com certificado de pureza e micronização fina.",
    featured: false,
    active: true,
    sold: 87,
    createdAt: "2026-03-11",
  },
  {
    id: "pre-treino-400",
    name: "Pré-Treino 400g",
    brand: "VoltFuel",
    category: "pre-treino",
    flavor: "Frutas Vermelhas",
    price: 97.9,
    oldPrice: 139.9,
    image: pretreino,
    stock: 6,
    description: "Cafeína, beta-alanina e citrulina para energia, foco e vasodilatação.",
    featured: true,
    active: true,
    sold: 288,
    createdAt: "2026-02-25",
  },
  {
    id: "pre-treino-300",
    name: "Pré-Treino Black 300g",
    brand: "VoltFuel",
    category: "pre-treino",
    flavor: "Limão",
    price: 84.9,
    image: pretreino,
    stock: 21,
    description: "Fórmula concentrada com 250mg de cafeína por dose.",
    featured: false,
    active: true,
    sold: 143,
    createdAt: "2026-03-08",
  },
  {
    id: "beta-alanina-200",
    name: "Beta Alanina 200g",
    brand: "LabForce",
    category: "pre-treino",
    flavor: "Sem sabor",
    price: 69.9,
    image: pretreino,
    stock: 14,
    description: "Retarda a fadiga muscular em treinos de alta intensidade.",
    featured: false,
    active: true,
    sold: 61,
    createdAt: "2026-01-30",
  },
  {
    id: "hipercalorico-3kg",
    name: "Hipercalórico 3kg",
    brand: "MassUp",
    category: "hipercaloricos",
    flavor: "Chocolate",
    price: 149.9,
    oldPrice: 179.9,
    image: hipercalorico,
    stock: 11,
    description: "1250 kcal por dose com carboidratos complexos e proteínas. Para ganho de massa.",
    featured: true,
    active: true,
    sold: 132,
    createdAt: "2026-02-14",
  },
  {
    id: "hipercalorico-1kg",
    name: "Hipercalórico 1kg",
    brand: "MassUp",
    category: "hipercaloricos",
    flavor: "Baunilha",
    price: 74.9,
    image: hipercalorico,
    stock: 3,
    description: "Versão de entrada para quem está começando o bulking.",
    featured: false,
    active: true,
    sold: 76,
    createdAt: "2026-03-05",
  },
  {
    id: "maltodextrina-1kg",
    name: "Maltodextrina 1kg",
    brand: "MassUp",
    category: "hipercaloricos",
    flavor: "Natural",
    price: 39.9,
    image: hipercalorico,
    stock: 24,
    description: "Carboidrato de absorção rápida para energia durante e após o treino.",
    featured: false,
    active: true,
    sold: 90,
    createdAt: "2026-01-18",
  },
  {
    id: "multivitaminico-60",
    name: "Multivitamínico 60 cápsulas",
    brand: "VitaCore",
    category: "vitaminas",
    price: 54.9,
    image: vitamina,
    stock: 38,
    description: "Complexo com 23 vitaminas e minerais para suporte diário.",
    featured: false,
    active: true,
    sold: 154,
    createdAt: "2026-01-12",
  },
  {
    id: "omega3-120",
    name: "Ômega 3 1000mg 120 cápsulas",
    brand: "VitaCore",
    category: "vitaminas",
    price: 59.9,
    oldPrice: 74.9,
    image: vitamina,
    stock: 29,
    description: "EPA e DHA concentrados, óleo de peixe purificado.",
    featured: true,
    active: true,
    sold: 121,
    createdAt: "2026-02-20",
  },
  {
    id: "vitamina-d3-60",
    name: "Vitamina D3 2000UI 60 cápsulas",
    brand: "VitaCore",
    category: "vitaminas",
    price: 34.9,
    image: vitamina,
    stock: 41,
    description: "Suporte para imunidade, ossos e saúde hormonal.",
    featured: false,
    active: true,
    sold: 88,
    createdAt: "2026-03-01",
  },
  {
    id: "termogenico-60",
    name: "Termogênico 60 cápsulas",
    brand: "BurnLine",
    category: "termogenicos",
    price: 79.9,
    oldPrice: 99.9,
    image: vitamina,
    stock: 5,
    description: "Cafeína anidra, chá verde e pimenta preta para suporte na definição.",
    featured: true,
    active: true,
    sold: 167,
    createdAt: "2026-02-08",
  },
  {
    id: "cafeina-90",
    name: "Cafeína 210mg 90 cápsulas",
    brand: "BurnLine",
    category: "termogenicos",
    price: 44.9,
    image: vitamina,
    stock: 22,
    description: "Energia e foco antes do treino, sem calorias.",
    featured: false,
    active: true,
    sold: 73,
    createdAt: "2026-01-27",
  },
  {
    id: "l-carnitina-60",
    name: "L-Carnitina 60 cápsulas",
    brand: "BurnLine",
    category: "termogenicos",
    price: 49.9,
    image: vitamina,
    stock: 0,
    description: "Auxilia no transporte de gordura para produção de energia.",
    featured: false,
    active: true,
    sold: 45,
    createdAt: "2026-03-14",
  },
  {
    id: "barra-proteica-60",
    name: "Barra Proteica 60g",
    brand: "BarraMax",
    category: "barras-e-snacks",
    flavor: "Amendoim",
    price: 14.9,
    oldPrice: 18.9,
    image: barra,
    stock: 0,
    description: "20g de proteína por barra, sem adição de açúcares.",
    featured: true,
    active: true,
    sold: 512,
    createdAt: "2026-02-03",
  },
  {
    id: "barra-caixa-12",
    name: "Caixa Barra Proteica 12un",
    brand: "BarraMax",
    category: "barras-e-snacks",
    flavor: "Chocolate",
    price: 159.9,
    image: barra,
    stock: 13,
    description: "Caixa fechada com 12 barras proteicas, economia de 10%.",
    featured: false,
    active: true,
    sold: 64,
    createdAt: "2026-03-09",
  },
  {
    id: "pasta-amendoim-500",
    name: "Pasta de Amendoim 500g",
    brand: "BarraMax",
    category: "barras-e-snacks",
    flavor: "Integral",
    price: 29.9,
    image: barra,
    stock: 19,
    description: "Fonte de gorduras boas e proteína vegetal, sem açúcar adicionado.",
    featured: false,
    active: true,
    sold: 138,
    createdAt: "2026-01-15",
  },
  {
    id: "coqueteleira-600",
    name: "Coqueteleira 600ml",
    brand: "Cariri Gear",
    category: "acessorios",
    price: 29.9,
    image: acessorio,
    stock: 47,
    description: "Coqueteleira com mola misturadora e tampa de rosca antivazamento.",
    featured: false,
    active: true,
    sold: 203,
    createdAt: "2026-02-11",
  },
  {
    id: "strap-treino",
    name: "Straps de Treino (par)",
    brand: "Cariri Gear",
    category: "acessorios",
    price: 39.9,
    oldPrice: 49.9,
    image: acessorio,
    stock: 2,
    description: "Straps reforçados para puxadas e levantamentos pesados.",
    featured: false,
    active: true,
    sold: 57,
    createdAt: "2026-03-06",
  },
];

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
