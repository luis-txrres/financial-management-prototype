import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { useBudgets } from "../../context/BudgetContext";
import { ArrowLeft } from "lucide-react";


export default function CreateBudget() {
  const navigate = useNavigate();
  const { addBudget } = useBudgets();

  const [name, setName] = useState("");
  const [limit, setLimit] = useState(0);

  const handleCreate = () => {
    if (!name || limit <= 0) {
      toast.error("Invalid input", {
        description: "Please enter a name and a positive limit",
      });
      return;
    }

    addBudget(name, limit);

    toast.success("Budget created", {
      description: `${name} with limit $${limit}`,
    });

    navigate("/budgets");
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
      <h1 className="text-2xl font-semibold">Create New Budget</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Budget</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Budget Name</label>
            <Input
              placeholder="e.g., Groceries"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">Budget Limit</label>
            <Input
              type="number"
              placeholder="e.g., 300"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            />
          </div>

          <Button 
            className="w-full hover:bg-blue-500 hover:text-white transition-colors" 
            onClick={handleCreate}>
            Create Budget
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}