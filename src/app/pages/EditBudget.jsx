import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useBudgets } from "../../context/BudgetContext";

export default function EditBudget() {
  const { id } = useParams();
  const navigate = useNavigate();
  const budgetId = Number(id);

  const { budgets, updateBudgetLimit } = useBudgets();
  const budget = budgets.find((b) => b.id === budgetId);

  const transactions = [
    { id: 1, categoryId: 1, name: "Walmart", amount: 120.45, date: "2024-02-01" },
    { id: 2, categoryId: 1, name: "Costco", amount: 330.11, date: "2024-02-05" },
    { id: 3, categoryId: 2, name: "Movie Theater", amount: 25.0, date: "2024-02-03" },
    { id: 4, categoryId: 3, name: "Gas Station", amount: 50.0, date: "2024-02-02" },
    ];

  const categoryTransactions = transactions.filter(
    (t) => t.categoryId === budgetId
  );

  const [limit, setLimit] = useState(budget?.limit || 0);

  const handleSave = () => {
    updateBudgetLimit(budgetId, limit);
    toast.success("Budget updated", {
      description: `New limit: $${limit}`,
    });

    navigate("/budgets");
  };

  return (
    <div className="p-4 md:p-8 space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>

        <h1 className="text-2xl font-semibold">{budget?.name} Budget</h1>

        <p className="text-slate-600 text-sm">
          You’ve spent <span className="font-medium">${budget?.spent.toFixed(2)}</span> of{" "}
          <span className="font-medium">${budget?.limit.toFixed(2)}</span>
        </p>
      </div>

      {/* Edit Limit Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Edit Limit</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Budget Limit</label>
            <Input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            />
          </div>

          <Button className="w-full" onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Transactions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transactions</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {categoryTransactions.length === 0 && (
            <p className="text-sm text-slate-600">No transactions found.</p>
          )}

          {categoryTransactions.map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center border-b pb-2 last:border-none"
            >
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-slate-500">{t.date}</p>
              </div>
              <span className="font-medium">${t.amount.toFixed(2)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}