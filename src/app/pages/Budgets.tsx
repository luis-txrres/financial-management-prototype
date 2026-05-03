import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { AlertCircle, TrendingDown, TrendingUp, Plus } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

export default function Budgets() {
  const navigate = useNavigate();

  const budgets = [
    {
      id: 1,
      name: "Groceries",
      spent: 450.56,
      limit: 600,
      period: "Monthly",
      hasAlert: false,
      trend: "down",
      trendPercent: 5,
    },
    {
      id: 2,
      name: "Entertainment",
      spent: 285.98,
      limit: 300,
      period: "Monthly",
      hasAlert: true,
      trend: "up",
      trendPercent: 12,
    },
    {
      id: 3,
      name: "Transportation",
      spent: 150.00,
      limit: 400,
      period: "Monthly",
      hasAlert: false,
      trend: "down",
      trendPercent: 8,
    },
    {
      id: 4,
      name: "Dining Out",
      spent: 220.45,
      limit: 350,
      period: "Monthly",
      hasAlert: false,
      trend: "up",
      trendPercent: 3,
    },
    {
      id: 5,
      name: "Shopping",
      spent: 180.00,
      limit: 250,
      period: "Monthly",
      hasAlert: false,
      trend: "up",
      trendPercent: 15,
    },
  ];

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overallPercentage = (totalSpent / totalBudget) * 100;

  const handleCreateBudget = () => {
    toast.info("Create Budget", {
      description: "Budget creation feature coming soon",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl mb-1">Budgets</h1>
          <p className="text-sm text-slate-600">Track your spending</p>
        </div>
        <Button onClick={handleCreateBudget} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Overall Budget</CardTitle>
          <CardDescription className="text-sm">Total spending across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl">${totalSpent.toFixed(2)}</span>
              <span className="text-slate-600">of ${totalBudget.toFixed(2)}</span>
            </div>
            <Progress value={overallPercentage} className="h-3" />
            <p className="text-sm text-slate-600">
              {overallPercentage.toFixed(1)}% of your total monthly budget used
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const remaining = budget.limit - budget.spent;
          const isNearLimit = percentage >= 90;

          return (
            <Card key={budget.id} className={isNearLimit ? "border-amber-500" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {budget.name}
                      {budget.hasAlert && (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      )}
                    </CardTitle>
                    <CardDescription>{budget.period} budget</CardDescription>
                  </div>
                  <Badge variant={budget.trend === "up" ? "destructive" : "secondary"}>
                    {budget.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {budget.trendPercent}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Spent</span>
                    <span className="font-medium">${budget.spent.toFixed(2)}</span>
                  </div>
                  <Progress
                    value={percentage}
                    className={`h-2 ${isNearLimit ? "bg-amber-100" : ""}`}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-slate-600">
                      ${remaining.toFixed(2)} remaining
                    </span>
                    <span className="text-sm text-slate-600">
                      ${budget.limit.toFixed(2)} limit
                    </span>
                  </div>
                </div>

                {budget.hasAlert && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/budgets/${budget.id}/alert`)}
                  >
                    View Alert Details
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
