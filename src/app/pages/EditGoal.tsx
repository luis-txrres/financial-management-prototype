import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useGoals, type TimePeriod } from "../../context/GoalContext";

const PERIODS: TimePeriod[] = ["Daily", "Weekly", "Monthly"];

export default function EditGoal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, updateGoal } = useGoals();

  const goal = goals.find((g) => g.id === Number(id));

  const [limit, setLimit] = useState(goal?.limit ?? 0);
  const [period, setPeriod] = useState<TimePeriod>(goal?.period ?? "Monthly");

  if (!goal) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-slate-600">Goal not found.</p>
        <Button variant="outline" onClick={() => navigate("/goals")} className="mt-4">
          Back to Goals
        </Button>
      </div>
    );
  }

  const pct = Math.min((goal.spent / limit) * 100, 100);

  const handleSave = () => {
    if (limit <= 0) {
      toast.error("Invalid limit", { description: "Please enter a positive dollar amount" });
      return;
    }
    updateGoal(goal.id, limit, period);
    toast.success("Goal updated", { description: `New limit: $${limit} ${period.toLowerCase()}` });
    navigate("/goals");
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-slate-600 hover:text-slate-800">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{goal.name}</h1>
        <p className="text-slate-600 text-sm">
          {goal.category} · Currently spent{" "}
          <span className="font-medium">${goal.spent.toFixed(2)}</span> of{" "}
          <span className="font-medium">${goal.limit.toFixed(2)}</span>
        </p>
      </div>

      <Card className="bg-slate-50">
        <CardContent className="pt-4 space-y-2">
          <p className="text-sm font-medium text-slate-700">Preview with new limit</p>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Spent</span>
            <span>${goal.spent.toFixed(2)} / ${limit > 0 ? limit.toFixed(2) : "—"}</span>
          </div>
          <Progress value={limit > 0 ? pct : 0} className="h-2" />
          <p className="text-xs text-slate-500">{limit > 0 ? pct.toFixed(1) : 0}% used</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Edit Goal</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 block mb-1">Dollar Limit</label>
            <Input type="number" value={limit || ""} onChange={(e) => setLimit(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm text-slate-600 block mb-1">Time Period</label>
            <Select value={period} onValueChange={(v) => setPeriod(v as TimePeriod)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {PERIODS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full hover:bg-blue-500 hover:text-white transition-colors" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/goals")}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
