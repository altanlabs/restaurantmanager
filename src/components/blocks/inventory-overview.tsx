import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { client } from "@/lib/database";
import { Badge } from "../ui/badge";

interface InventoryItem {
  id: string;
  item_name: string;
  category: string;
  quantity: number;
  unit: string;
  status: string;
  expiration_date: string;
}

export function InventoryOverview() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await client.from('Inventory').select('*').limit(5);
        setInventory(response.data as InventoryItem[]);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in stock':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'out of stock':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Inventory Overview</h2>
        <Button variant="outline">View All</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expiration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : inventory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No inventory items found
                </TableCell>
              </TableRow>
            ) : (
              inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.item_name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity} {item.unit}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(item.expiration_date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}