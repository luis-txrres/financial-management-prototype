import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useGoals, type TimePeriod } from "../../context/GoalContext";

const CATEGORIES = [
  "Groceries", "Entertainment", "Transportation", "Dining",
  "Shopping", "Bills", "Healthcare", "Education", "Other",
];
const PERIODS: TimePeriod[] = ["Daily", "Weekly", "Monthly"];

export default function CreateGoal() {
  const navigate = useNavigate();
  const { goals, addGoal } = useGoals();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [period, setPeriod] = useState<TimePeriod>("Monthly");
  const [limit, setLimit] = useState(0);

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Invalid input", { description: "Please enter a goal name" });
      return;
    }
    if (!category) {
      toast.error("Invalid input", { description: "Please select a category" });
      return;
    }
    if (limit <= 0) {
      toast.error("Invalid input", { description: "Please enter a positive dollar limit" });
      return;
    }
    const duplicate = goals.find((g) => g.category === category && g.period === period);
    if (duplicate) {
      toast.error("Goal already exists", {
        description: `A ${period.toLowerCase()} goal for ${category} already exists. Edit it instead.`,
      });
      return;
    }
    addGoal(name.trim(), category, limit, period);
    toast.success("Spending goal created", { description: `${name} — $${limit} ${period.toLowerCase()} limit` });
    navigate("/goals");
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-slate-600 hover:text-slate-800">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>
      <h1 className="text-2xl font-semibold">Create Spending Goal</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Spending Goal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 block mb-1">Goal Name</label>
            <Input placeholder="e.g., Monthly Grocery Budget" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-slate-600 block mb-1">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
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
          <div>
            <label className="text-sm text-slate-600 block mb-1">Dollar Limit</label>
            <Input type="number" placeholder="e.g., 300" value={limit || ""} onChange={(e) => setLimit(Number(e.target.value))} />
          </div>
          <Button className="w-full hover:bg-blue-500 hover:text-white transition-colors" onClick={handleCreate}>
            Create Goal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
