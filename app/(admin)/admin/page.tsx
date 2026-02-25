import { Activity, Package, DollarSign, Layers } from "lucide-react";
import { getDashboardStats } from "@/lib/catalog";

export default function AdminDashboard() {
  const statsData = getDashboardStats();

  const stats = [
    { label: "Estimated Revenue", value: `$${statsData.estimatedRevenue.toFixed(0)}`, icon: DollarSign, trend: "Synced" },
    { label: "Active Products", value: statsData.totalProducts, icon: Package, trend: "Live" },
    { label: "Collections", value: statsData.totalCollections, icon: Layers, trend: "Updated" },
    { label: "Average Price", value: `$${statsData.averagePrice}`, icon: Activity, trend: "Healthy" },
  ];

  return (
    <div className="p-10 space-y-10">
      <header>
        <h1 className="text-4xl font-serif">Command Center</h1>
        <p className="text-neutral-500">Real-time status of your gadget inventory and sales.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-white border border-neutral-100 rounded-3xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-neutral-50 rounded-xl text-neutral-900">
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">
                {stat.trend}
              </span>
            </div>
            <p className="text-sm text-neutral-400 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
