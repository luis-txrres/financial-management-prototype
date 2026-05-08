import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { AlertCircle, Plus, Target, Trash2, Pencil, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useGoals, type TimePeriod, type Goal } from "../../context/GoalContext";

const CATEGORIES = [
  "Groceries", "Entertainment", "Transportation", "Dining",
  "Shopping", "Bills", "Healthcare", "Education", "Other",
];
const PERIODS: TimePeriod[] = ["Daily", "Weekly", "Monthly"];

type View = "list" | "create" | "edit";

// ─── Shared helpers ───────────────────────────────────────────────────────────

function getStatus(spent: number, limit: number) {
  const pct = (spent / limit) * 100;
  if (pct >= 100) return { label: "Over Limit", className: "bg-red-100 text-red-700 border-red-200" };
  if (pct >= 90)  return { label: "Near Limit", className: "bg-amber-100 text-amber-700 border-amber-200" };
  return { label: "On Track", className: "bg-emerald-100 text-emerald-700 border-emerald-200" };
}

// ─── Sub-views ────────────────────────────────────────────────────────────────

function GoalList({ onCreate, onEdit }: { onCreate: () => void; onEdit: (goal: Goal) => void }) {
  const { goals, deleteGoal } = useGoals();

  const totalLimit = goals.reduce((sum, g) => sum + g.limit, 0);
  const totalSpent = goals.reduce((sum, g) => sum + g.spent, 0);
  const overallPct = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  const handleDelete = (id: number, name: string) => {
    deleteGoal(id);
    toast.success("Goal removed", { description: `${name} has been deleted` });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl mb-1">Spending Goals</h1>
          <p className="text-sm text-slate-600">Manage your spending limits by category</p>
        </div>
        <Button onClick={onCreate} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg">Overall Spending Goals</CardTitle>
          <CardDescription>Total across all active goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl">${totalSpent.toFixed(2)}</span>
            <span className="text-slate-600">of ${totalLimit.toFixed(2)}</span>
          </div>
          <Progress value={overallPct} className="h-3" />
          <p className="text-sm text-slate-600">{overallPct.toFixed(1)}% of your total spending goals used</p>
        </CardContent>
      </Card>

      {goals.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Target className="w-10 h-10 text-slate-300 mb-3" />
            <p className="font-medium text-slate-600">No spending goals yet</p>
            <p className="text-sm text-slate-400 mb-4">Create a goal to start tracking your spending</p>
            <Button onClick={onCreate} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {goals.map((goal) => {
          const pct = (goal.spent / goal.limit) * 100;
          const remaining = goal.limit - goal.spent;
          const isNearLimit = pct >= 90;
          const status = getStatus(goal.spent, goal.limit);

          return (
            <Card key={goal.id} className={isNearLimit ? "border-amber-500" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {goal.name}
                      {isNearLimit && <AlertCircle className="w-4 h-4 text-amber-500" />}
                    </CardTitle>
                    <CardDescription>{goal.category} · {goal.period}</CardDescription>
                  </div>
                  <Badge variant="outline" className={status.className}>{status.label}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-md border p-3 bg-slate-50">
                  <span className="text-sm font-medium">Category</span>
                  <span className="text-sm">{goal.category}</span>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Spent</span>
                    <span className="font-medium">${goal.spent.toFixed(2)}</span>
                  </div>
                  <Progress value={Math.min(pct, 100)} className={`h-2 ${isNearLimit ? "bg-amber-100" : ""}`} />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-slate-600">
                      {remaining >= 0
                        ? `$${remaining.toFixed(2)} remaining`
                        : `$${Math.abs(remaining).toFixed(2)} over limit`}
                    </span>
                    <span className="text-sm text-slate-600">${goal.limit.toFixed(2)} limit</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => onEdit(goal)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Goal
                </Button>

                <Button
                  variant="outline"
                  className="w-full text-red-500 border-red-300 hover:bg-red-50"
                  onClick={() => handleDelete(goal.id, goal.name)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Goal
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CreateGoalView({ onBack }: { onBack: () => void }) {
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
    onBack();
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <button onClick={onBack} className="flex items-center text-sm text-slate-600 hover:text-slate-800">
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

function EditGoalView({ goal, onBack }: { goal: Goal; onBack: () => void }) {
  const { updateGoal } = useGoals();
  const [limit, setLimit] = useState(goal.limit);
  const [period, setPeriod] = useState<TimePeriod>(goal.period);

  const pct = Math.min((goal.spent / limit) * 100, 100);

  const handleSave = () => {
    if (limit <= 0) {
      toast.error("Invalid limit", { description: "Please enter a positive dollar amount" });
      return;
    }
    updateGoal(goal.id, limit, period);
    toast.success("Goal updated", { description: `New limit: $${limit} ${period.toLowerCase()}` });
    onBack();
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <button onClick={onBack} className="flex items-center text-sm text-slate-600 hover:text-slate-800">
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
          <Button variant="outline" className="w-full" onClick={onBack}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function Goals() {
  const [view, setView] = useState<View>("list");
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  if (view === "create") {
    return <CreateGoalView onBack={() => setView("list")} />;
  }

  if (view === "edit" && editingGoal) {
    return (
      <EditGoalView
        goal={editingGoal}
        onBack={() => { setEditingGoal(null); setView("list"); }}
      />
    );
  }

  return (
    <GoalList
      onCreate={() => setView("create")}
      onEdit={(goal) => { setEditingGoal(goal); setView("edit"); }}
    />
  );
}
