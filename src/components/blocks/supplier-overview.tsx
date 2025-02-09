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

interface Supplier {
  id: string;
  name: string;
  type: string;
  sustainability_rating: number;
  active_status: boolean;
  contact_person: string;
}

export function SupplierOverview() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await client.from('Suppliers').select('*').limit(5);
        setSuppliers(response.data as Supplier[]);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const getSupplierTypeColor = (type: string) => {
    switch (type) {
      case 'local farm':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'wholesale':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'equipment':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Supplier Overview</h2>
        <Button variant="outline">View All</Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Sustainability Rating</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No suppliers found
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getSupplierTypeColor(supplier.type)}>
                      {supplier.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{supplier.contact_person}</TableCell>
                  <TableCell>
                    {"⭐".repeat(supplier.sustainability_rating)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={supplier.active_status ? "success" : "destructive"}>
                      {supplier.active_status ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}