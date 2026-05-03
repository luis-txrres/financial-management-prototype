import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Shield } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";

export default function Dashboard() {
  const navigate = useNavigate();

  const budgets = [
    { id: 1, name: "Groceries", spent: 450, limit: 600, hasAlert: false },
    { id: 2, name: "Entertainment", spent: 280, limit: 300, hasAlert: true },
    { id: 3, name: "Transportation", spent: 150, limit: 400, hasAlert: false },
  ];

  const recentTransactions = [
    { id: 1, name: "Whole Foods", amount: -87.32, date: "May 2", category: "Groceries" },
    { id: 2, name: "Netflix", amount: -15.99, date: "May 1", category: "Entertainment" },
    { id: 3, name: "Salary Deposit", amount: 3500.00, date: "Apr 30", category: "Income" },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl mb-1">Dashboard</h1>
        <p className="text-sm text-slate-600">Welcome back! Here's your financial overview.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$12,458.50</div>
            <p className="text-xs text-slate-500 mt-1">+2.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Income (May)</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$3,500.00</div>
            <p className="text-xs text-slate-500 mt-1">Salary received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Expenses (May)</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">$880.00</div>
            <p className="text-xs text-slate-500 mt-1">3 days into month</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <p className="text-sm text-slate-500">{transaction.date} · {transaction.category}</p>
                  </div>
                  <span className={transaction.amount > 0 ? "text-green-600" : "text-slate-900"}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate("/transactions")}
              >
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Track your spending limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                return (
                  <div key={budget.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{budget.name}</span>
                        {budget.hasAlert && (
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                      <span className="text-sm text-slate-600">
                        ${budget.spent} / ${budget.limit}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => navigate("/budgets")}
              >
                Manage Budgets
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
