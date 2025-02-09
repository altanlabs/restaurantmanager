import { useState, useEffect } from "react";
import { client } from "@/lib/database";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Filter, Download } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  type: string;
  contact_person: string;
  email: string;
  phone: string;
  sustainability_rating: number;
  payment_terms: string;
  active_status: boolean;
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await client.from('Suppliers').select('*');
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Supplier Management</h1>
          <p className="text-muted-foreground">
            Manage your restaurant's suppliers and partnerships
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Sustainability</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : suppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No suppliers found
                  </TableCell>
                </TableRow>
              ) : (
                suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">
                      {supplier.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getSupplierTypeColor(supplier.type)}
                      >
                        {supplier.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{supplier.contact_person}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>
                      {"⭐".repeat(supplier.sustainability_rating)}
                    </TableCell>
                    <TableCell>{supplier.payment_terms}</TableCell>
                    <TableCell>
                      <Badge
                        variant={supplier.active_status ? "success" : "destructive"}
                      >
                        {supplier.active_status ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}