import { NextResponse } from "next/server";
import { store } from "@/lib/store";
import { PaymentMethod } from "@/lib/types";

interface CheckoutPayload {
  customerName: string;
  customerEmail: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
  cartItems: { productId: string; quantity: number }[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as CheckoutPayload;

  if (!body.customerName || !body.customerEmail || !body.address || !body.city || !body.postalCode) {
    return NextResponse.json({ error: "Missing required checkout details" }, { status: 400 });
  }

  if (!body.cartItems?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const items = store.getCheckoutItemsFromCart(body.cartItems);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = items.length ? 12 : 0;
  const total = subtotal + shipping;

  const order = store.createOrder({
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    address: body.address,
    city: body.city,
    postalCode: body.postalCode,
    items,
    subtotal,
    shipping,
    total,
    paymentMethod: body.paymentMethod,
    paymentStatus: body.paymentMethod === "COD" ? "PENDING" : "PENDING",
  });

  if (body.paymentMethod === "COD") {
    return NextResponse.json({
      success: true,
      paymentMethod: "COD",
      orderId: order.id,
      message: "Order placed successfully with Cash on Delivery.",
    });
  }

  const safepayBaseUrl = process.env.SAFEPAY_CHECKOUT_URL || "https://sandbox.getsafepay.com/checkout";
  const successUrl = process.env.SAFEPAY_SUCCESS_URL || "http://localhost:3001/checkout?status=success";
  const cancelUrl = process.env.SAFEPAY_CANCEL_URL || "http://localhost:3001/checkout?status=cancelled";

  const checkoutUrl = `${safepayBaseUrl}?order_id=${order.id}&amount=${Math.round(total * 100)}&currency=PKR&success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`;

  store.updateOrder(order.id, {
    paymentReference: `safepay_${order.id}`,
  });

  return NextResponse.json({
    success: true,
    paymentMethod: "SAFEPAY",
    orderId: order.id,
    checkoutUrl,
  });
}
