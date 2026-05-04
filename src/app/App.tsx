import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/Toaster";
import { BudgetProvider } from "../context/BudgetContext";


export default function App() {
  return (
    <BudgetProvider>
      <RouterProvider router={router} />
      <Toaster />
    </BudgetProvider>
  );
}