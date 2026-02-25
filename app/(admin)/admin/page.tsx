import { PRODUCTS } from "@/lib/data";
import { Activity, Package, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Revenue", value: "$12,840", icon: DollarSign, trend: "+12%" },
    { label: "Active Products", value: PRODUCTS.length, icon: Package, trend: "Stable" },
    { label: "Pending Orders", value: "24", icon: Activity, trend: "+4 new" },
    { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, trend: "+0.4%" },
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
              <div className="p-2 bg-neutral-50 rounded-xl text-neutral-900"><stat.icon size={20} /></div>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-tighter">{stat.trend}</span>
            </div>
            <p className="text-sm text-neutral-400 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-neutral-100 rounded-[2.5rem] p-8">
          <h2 className="text-lg font-serif mb-6">Recent Activity</h2>
          {/* Placeholder for a Graph or Order List */}
          <div className="h-64 bg-neutral-50 rounded-2xl border-2 border-dashed border-neutral-100 flex items-center justify-center text-neutral-400 text-sm italic">
            Sales trend visualization will render here.
          </div>
        </div>
        <div className="bg-white border border-neutral-100 rounded-[2.5rem] p-8">
          <h2 className="text-lg font-serif mb-6">Low Stock Alert</h2>
          <div className="space-y-4">
             {/* Logic: PRODUCTS.filter(p => p.stock < 5) */}
             <div className="flex items-center gap-4 p-3 bg-red-50/50 rounded-2xl">
               <div className="w-10 h-10 bg-neutral-200 rounded-lg shrink-0" />
               <div className="flex-1"><p className="text-sm font-bold">Plasma Lighter</p><p className="text-xs text-red-500">2 units remaining</p></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}