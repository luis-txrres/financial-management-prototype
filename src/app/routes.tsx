import { createBrowserRouter, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import BudgetAlert from "./pages/BudgetAlert";
import Layout from "./components/Layout";
import EditBudget from "./pages/EditBudget";
import CreateBudget from "./pages/CreateBudget";
import CreateGoal from "./pages/CreateGoal";
import EditGoal from "./pages/EditGoal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
    ],
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "accounts",          Component: Accounts },
      { path: "transactions",      Component: Transactions },
      { path: "budgets",           Component: Budgets },
      { path: "budgets/:id/alert", Component: BudgetAlert },
      { path: "budgets/:id/edit",  Component: EditBudget },
      { path: "budgets/create",    element: <CreateBudget /> },
      { path: "goals",             Component: Goals },
      { path: "goals/create",      Component: CreateGoal },
      { path: "goals/:id/edit",    Component: EditGoal },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
