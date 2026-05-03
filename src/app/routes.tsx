import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import BudgetAlert from "./pages/BudgetAlert";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "accounts",
        Component: Accounts,
      },
      {
        path: "transactions",
        Component: Transactions,
      },
      {
        path: "budgets",
        Component: Budgets,
      },
      {
        path: "goals",
        Component: Goals,
      },
      {
        path: "budgets/:id/alert",
        Component: BudgetAlert,
      },
    ],
  },
]);
