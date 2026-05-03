import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { AlertCircle, ArrowLeft, TrendingUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";

export default function BudgetAlert() {
  const navigate = useNavigate();
  const { id } = useParams();

  const budgetData = {
    name: "Entertainment",
    spent: 285.98,
    limit: 300,
    remaining: 14.02,
    period: "Monthly",
    alertThreshold: 90,
  };

  const recentTransactions = [
    { id: 1, date: "2026-05-02", merchant: "Netflix", amount: 15.99 },
    { id: 2, date: "2026-05-01", merchant: "Spotify", amount: 9.99 },
    { id: 3, date: "2026-04-28", merchant: "Movie Theater", amount: 28.00 },
    { id: 4, date: "2026-04-25", merchant: "Concert Tickets", amount: 85.00 },
    { id: 5, date: "2026-04-20", merchant: "Video Games", amount: 59.99 },
  ];

  const percentage = (budgetData.spent / budgetData.limit) * 100;

  return (
    <div className="p-4 md:p-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/budgets")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Budgets
      </Button>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl">Budget Alert</h1>
          <Badge variant="destructive" className="text-sm">
            <AlertCircle className="w-3 h-3 mr-1" />
            High Spending
          </Badge>
        </div>
        <p className="text-slate-600">You're approaching your {budgetData.name.toLowerCase()} budget limit</p>
      </div>

      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Budget Alert Triggered</AlertTitle>
          <AlertDescription>
            You've used {percentage.toFixed(1)}% of your {budgetData.name} budget. Consider reviewing your spending to stay within your limit.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>{budgetData.name} Budget Status</CardTitle>
            <CardDescription>{budgetData.period} spending limit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Total Spent</p>
                <p className="text-2xl">${budgetData.spent.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">Budget Limit</p>
                <p className="text-2xl">${budgetData.limit.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 mb-1">Remaining</p>
                <p className="text-2xl text-green-700">${budgetData.remaining.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Budget Progress</span>
                <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
              <p className="text-xs text-slate-500 mt-2">
                Alert triggered at {budgetData.alertThreshold}% threshold
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Purchases in this category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{transaction.merchant}</p>
                    <p className="text-sm text-slate-500">{transaction.date}</p>
                  </div>
                  <span className="font-medium">-${transaction.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Insights</CardTitle>
            <CardDescription>Recommendations to help you stay on track</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">12% increase from last month</p>
                  <p className="text-sm text-blue-700">
                    Your entertainment spending has increased. Consider reviewing subscriptions.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-amber-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900">Only ${budgetData.remaining.toFixed(2)} left</p>
                  <p className="text-sm text-amber-700">
                    With {30 - new Date().getDate()} days remaining this month, try to limit discretionary entertainment expenses.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
