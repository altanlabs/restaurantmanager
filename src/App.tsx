import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import Dashboard from "./pages/index";
import InventoryPage from "./pages/inventory";
import SuppliersPage from "./pages/suppliers";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./theme/theme-provider";
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "inventory",
        element: <InventoryPage />,
      },
      {
        path: "suppliers",
        element: <SuppliersPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;