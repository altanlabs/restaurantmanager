import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Search, Filter, Edit2, Trash2, Clock, Fire, Leaf, Wheat, Milk, Fish } from "lucide-react";

// Mock data for development
const menuItems = [
  {
    id: 1,
    name: "Truffle Infused Mushroom Risotto",
    category: "Main Courses",
    subcategory: "Pasta & Risotto",
    price: 24.99,
    description: "Creamy Arborio rice with wild mushrooms, finished with black truffle and aged Parmesan",
    allergens: ["dairy", "gluten"],
    dietaryInfo: ["vegetarian"],
    prepTime: "25 mins",
    spicyLevel: 0,
    featured: true,
    popular: true,
    image: "https://placehold.co/400x300",
    ingredients: ["Arborio rice", "Wild mushrooms", "Black truffle", "Parmesan", "White wine"],
    available: true
  },
  {
    id: 2,
    name: "Pan-Seared Sea Bass",
    category: "Main Courses",
    subcategory: "Seafood",
    price: 32.99,
    description: "Fresh Mediterranean sea bass with herb-infused olive oil, served with roasted vegetables",
    allergens: ["fish"],
    dietaryInfo: ["gluten-free"],
    prepTime: "20 mins",
    spicyLevel: 0,
    featured: true,
    popular: false,
    image: "https://placehold.co/400x300",
    ingredients: ["Sea bass", "Olive oil", "Fresh herbs", "Seasonal vegetables"],
    available: true
  },
  {
    id: 3,
    name: "Spicy Thai Basil Noodles",
    category: "Main Courses",
    subcategory: "Asian Fusion",
    price: 18.99,
    description: "Stir-fried rice noodles with Thai basil, chili, and your choice of protein",
    allergens: ["soy", "nuts"],
    dietaryInfo: ["spicy"],
    prepTime: "15 mins",
    spicyLevel: 3,
    featured: false,
    popular: true,
    image: "https://placehold.co/400x300",
    ingredients: ["Rice noodles", "Thai basil", "Chili", "Soy sauce", "Garlic"],
    available: true
  }
];

const categories = [
  {
    name: "All",
    count: menuItems.length
  },
  {
    name: "Starters",
    subcategories: ["Soups", "Salads", "Small Plates"]
  },
  {
    name: "Main Courses",
    subcategories: ["Pasta & Risotto", "Meat", "Seafood", "Asian Fusion"]
  },
  {
    name: "Desserts",
    subcategories: ["Cakes", "Ice Cream", "Pastries"]
  },
  {
    name: "Beverages",
    subcategories: ["Cocktails", "Wine", "Soft Drinks"]
  }
];

const allergenIcons = {
  gluten: <Wheat className="h-4 w-4" />,
  dairy: <Milk className="h-4 w-4" />,
  fish: <Fish className="h-4 w-4" />
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUnavailable, setShowUnavailable] = useState(false);

  const getFilteredItems = () => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSubcategory = !activeSubcategory || item.subcategory === activeSubcategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAvailability = showUnavailable ? true : item.available;
      return matchesCategory && matchesSubcategory && matchesSearch && matchesAvailability;
    });
  };

  const getSpicyLevel = (level: number) => {
    return "🌶️".repeat(level);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">
            Create and manage your restaurant's culinary offerings
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Create a new culinary masterpiece for your menu
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Item name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" placeholder="0.00" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat.name !== "All").map((category) => (
                        <SelectItem key={category.name} value={category.name.toLowerCase()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .find(cat => cat.name === activeCategory)
                        ?.subcategories?.map((sub) => (
                          <SelectItem key={sub} value={sub.toLowerCase()}>
                            {sub}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your dish..."
                  className="resize-none"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  placeholder="Enter ingredients, separated by commas..."
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="prepTime">Preparation Time</Label>
                  <Input id="prepTime" placeholder="e.g., 20 mins" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="spicyLevel">Spicy Level (0-5)</Label>
                  <Input id="spicyLevel" type="number" min="0" max="5" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch id="featured" />
                  <Label htmlFor="featured">Featured Item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="available" defaultChecked />
                  <Label htmlFor="available">Available</Label>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Save Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={showUnavailable}
              onCheckedChange={setShowUnavailable}
            />
            <Label>Show Unavailable</Label>
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="mb-6">
          {categories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name}
              onClick={() => {
                setActiveCategory(category.name);
                setActiveSubcategory("");
              }}
            >
              {category.name}
              {category.count && (
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {activeCategory !== "All" && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories
              .find(cat => cat.name === activeCategory)
              ?.subcategories?.map((subcategory) => (
                <Button
                  key={subcategory}
                  variant={activeSubcategory === subcategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSubcategory(subcategory)}
                >
                  {subcategory}
                </Button>
              ))}
          </div>
        )}

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredItems().map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  {!item.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg">
                        Currently Unavailable
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {item.featured && (
                      <Badge variant="default" className="bg-yellow-500">
                        Featured
                      </Badge>
                    )}
                    {item.popular && (
                      <Badge variant="default" className="bg-red-500">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {item.name}
                        {item.spicyLevel > 0 && (
                          <span className="text-red-500" title={`Spicy Level: ${item.spicyLevel}`}>
                            {getSpicyLevel(item.spicyLevel)}
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{item.subcategory}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-lg">
                      ${item.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mb-4">
                    {item.allergens.map((allergen) => (
                      <Badge key={allergen} variant="destructive" className="flex items-center gap-1">
                        {allergenIcons[allergen as keyof typeof allergenIcons]}
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.prepTime}
                    </div>
                    {item.dietaryInfo.map((info) => (
                      <Badge key={info} variant="secondary" className="flex items-center gap-1">
                        <Leaf className="h-3 w-3" />
                        {info}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}