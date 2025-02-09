import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  ShoppingCart,
  Users,
  AlertTriangle,
  ClipboardList
} from "lucide-react";

export function QuickActions() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-4">
        <Button className="w-full justify-start" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Inventory Item
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Create Purchase Order
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Add New Supplier
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <ClipboardList className="mr-2 h-4 w-4" />
          View Reports
        </Button>
      </div>
    </Card>
  );
}