import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/Toaster";
import { BudgetProvider } from "../context/BudgetContext";
import { GoalProvider } from "../context/GoalContext";
import { TransactionProvider } from "../context/TransactionContext";

export default function App() {
  return (
    <BudgetProvider>
      <TransactionProvider>
        <GoalProvider>
          <RouterProvider router={router} />
          <Toaster />
        </GoalProvider>
      </TransactionProvider>
    </BudgetProvider>
  );
}
