import { Card } from "@/components/ui/card";
import {
  AlertCircle,
  ShoppingCart,
  Users,
  Leaf,
  TrendingUp,
  Clock,
} from "lucide-react";
import { InventoryOverview } from "@/components/blocks/inventory-overview";
import { SupplierOverview } from "@/components/blocks/supplier-overview";
import { SustainabilityMetrics } from "@/components/blocks/sustainability-metrics";
import { QuickActions } from "@/components/blocks/quick-actions";

export default function Dashboard() {
  const stats = [
    {
      title: "Low Stock Items",
      value: "12",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-100 dark:bg-red-900",
    },
    {
      title: "Active Orders",
      value: "8",
      icon: ShoppingCart,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Local Suppliers",
      value: "15",
      icon: Users,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Sustainability Score",
      value: "85%",
      icon: Leaf,
      color: "text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900",
    },
    {
      title: "Monthly Revenue",
      value: "$45.2k",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Expiring Soon",
      value: "23",
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-100 dark:bg-yellow-900",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Restaurant Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your restaurant management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid gap-6">
            <InventoryOverview />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SupplierOverview />
              <SustainabilityMetrics />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}