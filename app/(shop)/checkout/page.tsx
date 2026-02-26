"use client";

import { useCart } from "@/context/cart-context";

export default function CheckoutPage() {
  const { state } = useCart();
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = state.items.length ? 12 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-3 gap-8">
      <section className="lg:col-span-2 bg-white border border-neutral-100 rounded-3xl p-8 space-y-6">
        <h1 className="text-3xl font-serif">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="First name" />
          <input className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Last name" />
          <input className="rounded-xl border border-neutral-200 px-4 py-3 md:col-span-2" placeholder="Email" />
          <input className="rounded-xl border border-neutral-200 px-4 py-3 md:col-span-2" placeholder="Address" />
          <input className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="City" />
          <input className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Postal code" />
        </div>
        <button className="rounded-full bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest">
          Place Order
        </button>
      </section>

      <aside className="bg-white border border-neutral-100 rounded-3xl p-8 space-y-5 h-fit">
        <h2 className="text-xl font-serif">Order Summary</h2>
        <div className="space-y-3 text-sm">
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4">
              <p className="text-neutral-700">{item.name} × {item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-neutral-100 space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </aside>
    </div>
  );
}
