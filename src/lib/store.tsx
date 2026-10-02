import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialOrders,
  products as seedProducts,
  type Order,
  type OrderStatus,
  type Product,
} from "@/data/catalog";

export type CartItem = { id: string; qty: number };

type StoreValue = {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  cartOpen: boolean;
  cartCount: number;
  cartLines: { product: Product; qty: number }[];
  subtotal: number;
  savings: number;
  total: number;
  setCartOpen: (open: boolean) => void;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  addProduct: (product: Omit<Product, "id" | "sold" | "createdAt">) => string;
  removeProduct: (id: string) => void;
  resetCatalog: () => void;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => string;
  setOrderStatus: (id: string, status: OrderStatus) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

// As edições do painel ficam salvas só neste navegador (não há backend).
const STORAGE_KEY = "cariri-catalog-v1";

type SavedCatalog = { products: Product[]; removed: string[] };

function loadCatalog(): SavedCatalog | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedCatalog) : null;
  } catch {
    return null;
  }
}

// Produtos novos do código entram na lista; os já editados e os removidos pelo painel são preservados.
function mergeWithSeed(saved: SavedCatalog): Product[] {
  const savedIds = new Set(saved.products.map((p) => p.id));
  const removed = new Set(saved.removed);
  const fresh = seedProducts.filter((p) => !savedIds.has(p.id) && !removed.has(p.id));
  return [...saved.products, ...fresh];
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [removed, setRemoved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Carrega depois da montagem para o HTML do servidor e do cliente continuarem iguais.
  useEffect(() => {
    const saved = loadCatalog();
    if (saved) {
      setProducts(mergeWithSeed(saved));
      setRemoved(saved.removed);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, removed }));
    } catch {
      /* armazenamento indisponível: segue só em memória */
    }
  }, [products, removed, hydrated]);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const addProduct = useCallback((product: Omit<Product, "id" | "sold" | "createdAt">) => {
    const id = `n${Date.now().toString(36)}`;
    setProducts((prev) => [
      { ...product, id, sold: 0, createdAt: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
    return id;
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setRemoved((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const resetCatalog = useCallback(() => {
    setProducts(seedProducts);
    setRemoved([]);
  }, []);

  const addOrder = useCallback((order: Omit<Order, "id" | "createdAt" | "status">) => {
    const id = String(1049 + Math.floor(Math.random() * 50));
    setOrders((prev) => [
      {
        ...order,
        id,
        status: "NOVO" as OrderStatus,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    return id;
  }, []);

  const setOrderStatus = useCallback((id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }, []);

  const value = useMemo<StoreValue>(() => {
    const cartLines = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? { product, qty: item.qty } : null;
      })
      .filter((l): l is { product: Product; qty: number } => l !== null);

    const total = cartLines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
    const subtotal = cartLines.reduce(
      (sum, l) => sum + (l.product.oldPrice ?? l.product.price) * l.qty,
      0,
    );

    return {
      products,
      orders,
      cart,
      cartOpen,
      cartCount: cart.reduce((n, i) => n + i.qty, 0),
      cartLines,
      subtotal,
      savings: subtotal - total,
      total,
      setCartOpen,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      updateProduct,
      addProduct,
      removeProduct,
      resetCatalog,
      addOrder,
      setOrderStatus,
    };
  }, [
    products,
    orders,
    cart,
    cartOpen,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    updateProduct,
    addProduct,
    removeProduct,
    resetCatalog,
    addOrder,
    setOrderStatus,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const stockStatus = (stock: number) =>
  stock === 0
    ? { label: "Esgotado", tone: "out" as const }
    : stock <= 6
      ? { label: "Últimas unidades", tone: "low" as const }
      : { label: "Em estoque", tone: "ok" as const };

export const discountPct = (p: { price: number; oldPrice?: number | undefined }) =>
  p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
