import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import StoreShell from "@/components/StoreShell";
import { WHATSAPP_URL, formatBRL, priceLabel } from "@/data/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — Cariri Suplementos" },
      { name: "description", content: "Revise seu carrinho e envie o pedido." },
      { property: "og:title", content: "Finalizar pedido — Cariri Suplementos" },
      { property: "og:description", content: "Revise seu carrinho e envie o pedido." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { cartLines, total, savings, addOrder, clearCart } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState<"Retirar na loja" | "Receber em casa">("Retirar na loja");
  const [address, setAddress] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const fee = delivery === "Receber em casa" ? 10 : 0;

  if (done)
    return (
      <StoreShell>
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <h1 className="font-display text-4xl uppercase text-primary">Pedido #{done} enviado!</h1>
          <p className="mt-3 text-muted-foreground">A loja vai confirmar pelo WhatsApp em instantes.</p>
          <div className="mt-8 flex justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Abrir WhatsApp</a>
            <Link to="/catalogo" className="rounded-md bg-card px-5 py-3 font-semibold text-foreground ring-1 ring-border">Continuar comprando</Link>
          </div>
        </div>
      </StoreShell>
    );

  if (cartLines.length === 0)
    return (
      <StoreShell>
        <div className="mx-auto max-w-lg px-4 py-20 text-center">
          <h1 className="font-display text-3xl uppercase text-foreground">Seu carrinho está vazio</h1>
          <Link to="/catalogo" className="mt-6 inline-block rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">Ver produtos</Link>
        </div>
      </StoreShell>
    );

  const valid = name.trim().length > 1 && phone.trim().length >= 8 && (delivery === "Retirar na loja" || address.trim().length > 4);
  const input = "w-full rounded-md border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary";

  return (
    <StoreShell>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_380px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!valid) return;
            const id = addOrder({
              customer: name,
              phone,
              delivery,
              total: total + fee,
              items: cartLines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
            });
            clearCart();
            setDone(id);
          }}
          className="space-y-6"
        >
          <h1 className="font-display text-4xl uppercase text-foreground">Finalizar pedido</h1>
          <div className="space-y-3 rounded-xl bg-card p-5 ring-1 ring-border">
            <h2 className="font-semibold text-foreground">Seus dados</h2>
            <input className={input} placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
            <input className={input} placeholder="WhatsApp (88) 9...." value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-3 rounded-xl bg-card p-5 ring-1 ring-border">
            <h2 className="font-semibold text-foreground">Entrega</h2>
            <div className="grid grid-cols-2 gap-3">
              {(["Retirar na loja", "Receber em casa"] as const).map((d) => (
                <button type="button" key={d} onClick={() => setDelivery(d)} className={`rounded-md p-3 text-sm font-semibold ring-1 ${delivery === d ? "bg-primary text-primary-foreground ring-primary" : "text-foreground ring-border"}`}>
                  {d}
                  <span className="block text-xs font-normal opacity-80">{d === "Retirar na loja" ? "Grátis" : formatBRL(10)}</span>
                </button>
              ))}
            </div>
            {delivery === "Receber em casa" && <input className={input} placeholder="Endereço completo" value={address} onChange={(e) => setAddress(e.target.value)} />}
          </div>
          <button disabled={!valid} className="w-full rounded-md bg-primary py-3.5 font-semibold text-primary-foreground disabled:opacity-50">
            Enviar pedido · {formatBRL(total + fee)}
          </button>
          <p className="text-center text-xs text-muted-foreground">Pagamento combinado na retirada ou entrega (Pix, cartão ou dinheiro).</p>
        </form>
        <aside className="h-fit rounded-xl bg-card p-5 ring-1 ring-border">
          <h2 className="font-semibold text-foreground">Resumo</h2>
          <ul className="mt-4 space-y-3">
            {cartLines.map((l) => (
              <li key={l.product.id} className="flex gap-3 text-sm">
                <img src={l.product.image} alt="" className="size-12 rounded-md object-cover" />
                <span className="flex-1 text-foreground">{l.qty}× {l.product.name}</span>
                <span className="text-foreground">{l.product.price > 0 ? formatBRL(l.product.price * l.qty) : priceLabel(l.product)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
            {savings > 0 && <div className="flex justify-between text-primary"><dt>Economia</dt><dd>-{formatBRL(savings)}</dd></div>}
            <div className="flex justify-between text-muted-foreground"><dt>Entrega</dt><dd>{fee ? formatBRL(fee) : "Grátis"}</dd></div>
            <div className="flex justify-between pt-2 text-lg font-bold text-foreground"><dt>Total</dt><dd>{formatBRL(total + fee)}</dd></div>
          </dl>
        </aside>
      </div>
    </StoreShell>
  );
}
