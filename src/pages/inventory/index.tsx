import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search, Filter, AlertCircle } from "lucide-react";

// Mock data for development
const inventoryItems = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Produce",
    quantity: 50,
    unit: "kg",
    minThreshold: 20,
    expirationDate: "2024-03-15",
    supplier: "Local Farm Fresh",
    status: "in stock",
  },
  {
    id: 2,
    name: "Chicken Breast",
    category: "Meat",
    quantity: 15,
    unit: "kg",
    minThreshold: 25,
    expirationDate: "2024-03-10",
    supplier: "Premium Meats",
    status: "low stock",
  },
  // Add more items as needed
];

const categories = ["All", "Produce", "Meat", "Dairy", "Dry Goods", "Supplies"];

export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = inventoryItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in stock":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "low stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "out of stock":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const lowStockItems = inventoryItems.filter(
    (item) => item.quantity < item.minThreshold
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage your restaurant's inventory
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>
                Add a new item to your inventory
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" placeholder="Item name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== "All").map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" placeholder="kg, liters, etc." />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minThreshold">Minimum Threshold</Label>
                <Input id="minThreshold" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Input id="expirationDate" type="date" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {lowStockItems.length > 0 && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="mr-2 h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {lowStockItems.length} items are below minimum threshold
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-6">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="bg-card rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Min. Threshold</TableHead>
                  <TableHead>Expiration Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>{item.minThreshold} {item.unit}</TableCell>
                    <TableCell>{new Date(item.expirationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusColor(item.status)}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}