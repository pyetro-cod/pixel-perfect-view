export type Category =
  | "Proteína"
  | "Creatina"
  | "Pasta de Amendoim"
  | "Barra de Proteína"
  | "Multivitamínico"
  | "Termogênico"
  | "Acessórios";

export type Section =
  | "Proteínas & Whey"
  | "Creatinas"
  | "Pastas de Amendoim & Alimentos Funcionais"
  | "Barras Proteicas & Snacks"
  | "Vitaminas, Termogênicos & Emagrecimento"
  | "Acessórios";

export interface Product {
  id: string; // também é o nome do arquivo da imagem (ex.: "01" -> 01.jpeg)
  name: string;
  brand: string;
  section: Section;
  category: Category;
  subcategory: string;
  flavor?: string;
  weight?: string;
  presentation?: string;
  color?: string;
  tags?: string[];
  price: number | null; // TODO: preencher
}

export const SECTION_ORDER: Section[] = [
  "Proteínas & Whey",
  "Creatinas",
  "Pastas de Amendoim & Alimentos Funcionais",
  "Barras Proteicas & Snacks",
  "Vitaminas, Termogênicos & Emagrecimento",
  "Acessórios",
];

export const products: Product[] = [
  // PROTEÍNAS & WHEY
  { id: "01", name: "Nutrata W100 Whey Concentrado", brand: "Nutrata", section: "Proteínas & Whey", category: "Proteína", subcategory: "Whey Protein Concentrado", flavor: "Baunilha", weight: "900g", price: null },
  { id: "02", name: "Shark Pro 100% Whey Protein", brand: "Shark Pro", section: "Proteínas & Whey", category: "Proteína", subcategory: "Whey Protein Concentrado", flavor: "Chocolate", weight: "900g", price: null },
  { id: "03", name: "FTW Zero Leite Whey Protein Concentrado", brand: "FTW Suplementos", section: "Proteínas & Whey", category: "Proteína", subcategory: "Whey Protein (Zero Lactose)", flavor: "Sorvete de Leite", weight: "900g", tags: ["Zero Lactose"], price: null },
  { id: "04", name: "Max Titanium 100% Whey", brand: "Max Titanium", section: "Proteínas & Whey", category: "Proteína", subcategory: "Whey Protein Concentrado", flavor: "Baunilha", weight: "900g", price: null },
  { id: "05", name: "UP Level 100% Pure Whey", brand: "UP Level", section: "Proteínas & Whey", category: "Proteína", subcategory: "Whey Protein Concentrado", flavor: "Paçoca", weight: "1kg", price: null },
  { id: "06", name: "New Millen Isolate Protein", brand: "New Millen", section: "Proteínas & Whey", category: "Proteína", subcategory: "Proteína Isolada (Zero Lactose)", flavor: "Morango", weight: "900g", tags: ["Zero Lactose"], price: null },
  { id: "26", name: "Adaptogen Tasty Whey", brand: "Adaptogen Science", section: "Proteínas & Whey", category: "Proteína", subcategory: "Whey Protein", flavor: "Banoffee", price: null }, // confirmar peso
  { id: "27", name: "Pro Nutri 3 Whey Protein Triple Blend", brand: "Pro Nutri", section: "Proteínas & Whey", category: "Proteína", subcategory: "Whey Protein (Triple Blend)", weight: "2kg", price: null }, // confirmar peso e sabor

  // CREATINAS
  { id: "18", name: "Max Titanium Creatine", brand: "Max Titanium", section: "Creatinas", category: "Creatina", subcategory: "Creatina Monohidratada", weight: "300g", price: null },
  { id: "19", name: "Max Titanium Creatine 7Belo", brand: "Max Titanium", section: "Creatinas", category: "Creatina", subcategory: "Creatina Monohidratada", flavor: "Framboesa", weight: "300g", tags: ["Edição Especial"], price: null },
  { id: "20", name: "Growth Supplements Creatina Monohidratada", brand: "Growth Supplements", section: "Creatinas", category: "Creatina", subcategory: "Creatina Monohidratada", weight: "250g", price: null },
  { id: "21", name: "Black Skull Creatine", brand: "Black Skull", section: "Creatinas", category: "Creatina", subcategory: "Creatina Monohidratada", flavor: "Sem sabor", weight: "300g", price: null },
  { id: "22", name: "DUX Creatina", brand: "DUX", section: "Creatinas", category: "Creatina", subcategory: "Creatina Monohidratada", flavor: "Sem sabor", weight: "300g", presentation: "60 doses", price: null },
  { id: "23", name: "Integralmedica Creatina Hardcore 100% Pura", brand: "Integralmedica", section: "Creatinas", category: "Creatina", subcategory: "Creatina", weight: "300g", price: null },
  { id: "24", name: "Integralmedica Creatina Hardcore", brand: "Integralmedica", section: "Creatinas", category: "Creatina", subcategory: "Creatina", flavor: "Morango", weight: "350g", tags: ["Zero Carbo"], price: null },
  { id: "25", name: "Nutrata Creatin Up", brand: "Nutrata", section: "Creatinas", category: "Creatina", subcategory: "Creatina Monohidratada", flavor: "Neutro", weight: "300g", tags: ["Micronizada 200 mesh"], price: null },

  // PASTAS DE AMENDOIM & ALIMENTOS FUNCIONAIS
  { id: "07", name: "Dr. Peanut Pasta de Amendoim", brand: "Dr. Peanut", section: "Pastas de Amendoim & Alimentos Funcionais", category: "Pasta de Amendoim", subcategory: "Alimento Funcional", flavor: "Bueníssimo", weight: "600g", price: null },
  { id: "08", name: "Dr. Peanut Pasta de Amendoim", brand: "Dr. Peanut", section: "Pastas de Amendoim & Alimentos Funcionais", category: "Pasta de Amendoim", subcategory: "Alimento Funcional", flavor: "Avelã", weight: "600g", price: null },
  { id: "09", name: "Dr. Peanut Pasta de Amendoim", brand: "Dr. Peanut", section: "Pastas de Amendoim & Alimentos Funcionais", category: "Pasta de Amendoim", subcategory: "Alimento Funcional", flavor: "Chocotine", weight: "600g", price: null },
  { id: "10", name: "Dr. Peanut Pasta de Amendoim - Edição Especial", brand: "Dr. Peanut", section: "Pastas de Amendoim & Alimentos Funcionais", category: "Pasta de Amendoim", subcategory: "Alimento Funcional", flavor: "Banoffee", weight: "600g", tags: ["Edição Especial"], price: null },

  // BARRAS PROTEICAS & SNACKS
  { id: "11", name: "Integralmedica Protein Crisp Bar", brand: "Integralmedica", section: "Barras Proteicas & Snacks", category: "Barra de Proteína", subcategory: "Snack Proteico", flavor: "Cookies and Cream", presentation: "Caixa com 12 unidades", price: null },
  { id: "12", name: "Integralmedica Protein Crisp Bar", brand: "Integralmedica", section: "Barras Proteicas & Snacks", category: "Barra de Proteína", subcategory: "Snack Proteico", flavor: "Ovomaltine", presentation: "Caixa com 12 unidades", price: null },

  // VITAMINAS, TERMOGÊNICOS & EMAGRECIMENTO
  { id: "13", name: "Growth Supplements Multi", brand: "Growth Supplements", section: "Vitaminas, Termogênicos & Emagrecimento", category: "Multivitamínico", subcategory: "Vitaminas e Minerais", presentation: "120 cápsulas", price: null },
  { id: "14", name: "Fullife Nutrition Fullflame Essential", brand: "Fullife Nutrition", section: "Vitaminas, Termogênicos & Emagrecimento", category: "Termogênico", subcategory: "Cafeína", presentation: "30 cápsulas (200mg cafeína)", price: null },
  { id: "15", name: "Atlhetica Nutrition Lipo Burn", brand: "Atlhetica Nutrition", section: "Vitaminas, Termogênicos & Emagrecimento", category: "Termogênico", subcategory: "Emagrecimento", presentation: "60 cápsulas", price: null },

  // ACESSÓRIOS
  { id: "16", name: "Coqueteleira / Shaker Integralmedica", brand: "Integralmedica", section: "Acessórios", category: "Acessórios", subcategory: "Coqueteleira", color: "Preta", price: null },
  { id: "17", name: "Coqueteleira / Shaker Under Labz", brand: "Under Labz", section: "Acessórios", category: "Acessórios", subcategory: "Coqueteleira", color: "Branca", price: null },
];