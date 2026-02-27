import { store } from "@/lib/store";
import { OrderStatusSelect } from "@/components/admin/actions/order-status-select";

export default function AdminOrdersPage() {
  const orders = store.getOrders();
  const notifications = store.getNotifications().slice(0, 5);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-serif">Orders & Tracking</h1>
        <p className="text-sm text-neutral-500 mt-1">Monitor order placement notifications and update fulfillment status.</p>
      </header>

      <section className="bg-white border border-neutral-100 rounded-3xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Latest Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-sm text-neutral-500">No notifications yet.</p>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div key={notification.id} className="text-sm border border-neutral-100 rounded-xl px-3 py-2">
                <p className={notification.read ? "text-neutral-500" : "text-neutral-900 font-medium"}>{notification.message}</p>
                <p className="text-xs text-neutral-400 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white border border-neutral-100 rounded-3xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Payment</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Tracking</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-neutral-100">
                <td className="px-6 py-4 font-medium">{order.id.slice(0, 8)}...</td>
                <td className="px-6 py-4">
                  <p>{order.customerName}</p>
                  <p className="text-xs text-neutral-500">{order.customerEmail}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{order.paymentMethod}</p>
                  <p className="text-xs text-neutral-500">{order.paymentStatus}</p>
                </td>
                <td className="px-6 py-4">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4"><OrderStatusSelect id={order.id} current={order.fulfillmentStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
