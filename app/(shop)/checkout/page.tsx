"use client";

import { useCart } from "@/context/cart-context";
import { useMemo, useState } from "react";
import { Truck, ShieldCheck, CreditCard } from "lucide-react";

type PaymentMethod = "COD" | "SAFEPAY";

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items],
  );
  const shipping = state.items.length ? 12 : 0;
  const total = subtotal + shipping;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      customerName: `${String(form.get("firstName") ?? "")} ${String(form.get("lastName") ?? "")}`.trim(),
      customerEmail: String(form.get("email") ?? ""),
      address: String(form.get("address") ?? ""),
      city: String(form.get("city") ?? ""),
      postalCode: String(form.get("postalCode") ?? ""),
      paymentMethod,
      cartItems: state.items.map((item) => ({ productId: item.id, quantity: item.quantity })),
    };

    const response = await fetch("/api/payments/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setMessage(data.error ?? "Unable to process checkout.");
      return;
    }

    const data = (await response.json()) as {
      paymentMethod: PaymentMethod;
      message?: string;
      checkoutUrl?: string;
    };

    if (data.paymentMethod === "COD") {
      clearCart();
      setMessage(data.message ?? "Order placed successfully.");
      return;
    }

    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-3 gap-8">
      <form onSubmit={onSubmit} className="lg:col-span-2 bg-white border border-neutral-100 rounded-3xl p-8 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-serif">Secure Checkout</h1>
          <p className="text-sm text-neutral-500">Fill in your shipping details and choose your payment method.</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">Contact & Shipping</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input name="firstName" required className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="First name" />
            <input name="lastName" required className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Last name" />
            <input name="email" type="email" required className="rounded-xl border border-neutral-200 px-4 py-3 md:col-span-2" placeholder="Email" />
            <input name="address" required className="rounded-xl border border-neutral-200 px-4 py-3 md:col-span-2" placeholder="Address" />
            <input name="city" required className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="City" />
            <input name="postalCode" required className="rounded-xl border border-neutral-200 px-4 py-3" placeholder="Postal code" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">Payment Method</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("COD")}
              className={`border rounded-2xl p-4 text-left transition-all ${paymentMethod === "COD" ? "border-black bg-neutral-50" : "border-neutral-200"}`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold"><Truck size={16} /> Cash on Delivery</div>
              <p className="text-xs text-neutral-500 mt-2">Pay when your order arrives at your doorstep.</p>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("SAFEPAY")}
              className={`border rounded-2xl p-4 text-left transition-all ${paymentMethod === "SAFEPAY" ? "border-black bg-neutral-50" : "border-neutral-200"}`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold"><CreditCard size={16} /> Safepay</div>
              <p className="text-xs text-neutral-500 mt-2">Pay securely online using your Safepay setup.</p>
            </button>
          </div>
        </section>

        {message ? <p className="text-sm text-neutral-700 bg-neutral-100 rounded-xl px-4 py-3">{message}</p> : null}

        <button disabled={loading || !state.items.length} className="rounded-full bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest disabled:opacity-60">
          {loading ? "Processing..." : paymentMethod === "COD" ? "Place COD Order" : "Continue to Safepay"}
        </button>
      </form>

      <aside className="bg-white border border-neutral-100 rounded-3xl p-8 space-y-5 h-fit">
        <h2 className="text-xl font-serif">Order Summary</h2>
        <div className="space-y-3 text-sm">
          {state.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4">
              <p className="text-neutral-700">
                {item.name} × {item.quantity}
              </p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-neutral-100 space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold text-base"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>

        <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-500">
          <p className="flex items-center gap-2"><ShieldCheck size={14} /> Secure checkout with COD and Safepay.</p>
          <p className="flex items-center gap-2"><Truck size={14} /> Estimated delivery in 2–5 business days.</p>
        </div>
      </aside>
    </div>
  );
}
