import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { AlertCircle, TrendingDown, TrendingUp, Plus } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { useBudgets } from "../../context/BudgetContext";

export default function Budgets() {
  const navigate = useNavigate();

  const { budgets, deleteBudget } = useBudgets();

  const totalBudget = budgets.reduce((sum: number, b: any) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum: number, b: any) => sum + b.spent, 0);
  const overallPercentage = (totalSpent / totalBudget) * 100;

  const handleCreateBudget = () => navigate("/budgets/create");

  const handleDelete = (id: number, name: string) => {
    deleteBudget(id);

    toast.success("Budget deleted", {
      description: `${name} has been removed`,
    });
  };

  const getBudgetStatus = (spent: number, limit: number) => {
    const percent = (spent / limit) * 100;

    if (percent >= 100) {
      return {
        label: "Over Budget",
        className: "bg-red-100 text-red-700 border-red-200",
      };
    }

    if (percent >= 90) {
      return {
        label: "Near Limit",
        className: "bg-amber-100 text-amber-700 border-amber-200",
      };
    }

    return {
      label: "On Track",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
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
          <CardDescription className="text-sm">
            Total spending across all categories
          </CardDescription>
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
        {budgets.map((budget: any) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const remaining = budget.limit - budget.spent;
          const isNearLimit = percentage >= 90;
          const status = getBudgetStatus(budget.spent, budget.limit);

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
                <div className="flex items-center justify-between rounded-md border p-3 bg-slate-50">
                  <span className="text-sm font-medium">Budget Status</span>
                  <Badge variant="outline" className={status.className}>
                    {status.label}
                  </Badge>
                </div>

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

                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/budgets/${budget.id}/edit`)}
                  >
                    Edit Budget
                  </Button>
                </div>

                <div>
                  <Button
                    variant="outline"
                    className="w-full text-red-500 border-red-300 hover:bg-red-50"
                    onClick={() => handleDelete(budget.id, budget.name)}
                  >
                    Delete Budget
                  </Button>
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