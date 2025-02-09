import { Outlet } from "react-router-dom";
import AppSidebar from "./components/blocks/app-sidebar";
import {
  LayoutGrid,
  ShoppingCart,
  Users,
  Utensils,
  BarChart,
  Settings,
  Leaf,
  Clock,
} from "lucide-react";

export default function Layout() {
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: LayoutGrid,
      href: "/",
    },
    {
      title: "Inventory",
      icon: ShoppingCart,
      href: "/inventory",
      children: [
        {
          title: "Stock Levels",
          href: "/inventory/stock",
        },
        {
          title: "Expiration Tracking",
          href: "/inventory/expiration",
        },
        {
          title: "Categories",
          href: "/inventory/categories",
        },
      ],
    },
    {
      title: "Suppliers",
      icon: Leaf,
      href: "/suppliers",
      children: [
        {
          title: "Local Farmers",
          href: "/suppliers/local",
        },
        {
          title: "All Suppliers",
          href: "/suppliers/all",
        },
        {
          title: "Orders",
          href: "/suppliers/orders",
        },
      ],
    },
    {
      title: "Menu",
      icon: Utensils,
      href: "/menu",
      children: [
        {
          title: "Items",
          href: "/menu/items",
        },
        {
          title: "Categories",
          href: "/menu/categories",
        },
        {
          title: "Recipes",
          href: "/menu/recipes",
        },
      ],
    },
    {
      title: "Staff",
      icon: Users,
      href: "/staff",
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: "/analytics",
      children: [
        {
          title: "Usage",
          href: "/analytics/usage",
        },
        {
          title: "Costs",
          href: "/analytics/costs",
        },
        {
          title: "Sustainability",
          href: "/analytics/sustainability",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar items={sidebarItems} />
      <main className="flex-1 overflow-y-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
}