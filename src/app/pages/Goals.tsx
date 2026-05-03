import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Target, Plus, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { toast } from "sonner";

export default function Goals() {
  const [goals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 6500,
      deadline: "2026-12-31",
      category: "Savings",
      priority: "high",
      monthlyContribution: 500,
    },
    {
      id: 2,
      name: "Vacation to Japan",
      target: 5000,
      current: 2800,
      deadline: "2027-06-15",
      category: "Travel",
      priority: "medium",
      monthlyContribution: 200,
    },
    {
      id: 3,
      name: "New Laptop",
      target: 2500,
      current: 1800,
      deadline: "2026-09-01",
      category: "Technology",
      priority: "medium",
      monthlyContribution: 175,
    },
    {
      id: 4,
      name: "Home Down Payment",
      target: 50000,
      current: 18500,
      deadline: "2028-03-31",
      category: "Housing",
      priority: "high",
      monthlyContribution: 1200,
    },
  ]);

  const handleAddGoal = () => {
    toast.info("Create Goal", {
      description: "Goal creation feature coming soon",
    });
  };

  const handleContribute = (goalName: string) => {
    toast.success(`Contribution added to ${goalName}`, {
      description: "Your progress has been updated",
    });
  };

  const calculateMonthsRemaining = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const months = Math.round((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return months;
  };

  const totalGoalsAmount = goals.reduce((sum, g) => sum + g.target, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.current, 0);
  const overallProgress = (totalSaved / totalGoalsAmount) * 100;

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl mb-1">Goals</h1>
          <p className="text-sm text-slate-600">Your savings targets</p>
        </div>
        <Button onClick={handleAddGoal} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Goal Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalGoalsAmount.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">{goals.length} active goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">${totalSaved.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">{overallProgress.toFixed(1)}% of total goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Monthly Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              ${goals.reduce((sum, g) => sum + g.monthlyContribution, 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-1">Across all goals</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;
          const monthsLeft = calculateMonthsRemaining(goal.deadline);
          const onTrack = monthsLeft > 0 && (remaining / monthsLeft) <= goal.monthlyContribution;

          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>{goal.name}</CardTitle>
                      <CardDescription>{goal.category}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={goal.priority === "high" ? "default" : "secondary"}>
                    {goal.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-600">Progress</span>
                    <span className="font-medium">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{percentage.toFixed(1)}% complete</span>
                    <span className="text-slate-600">${remaining.toLocaleString()} to go</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-600">Deadline</p>
                      <p className="text-sm font-medium">
                        {new Date(goal.deadline).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-slate-500">{monthsLeft} months left</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 h-4 text-slate-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-600">Monthly</p>
                      <p className="text-sm font-medium">${goal.monthlyContribution}</p>
                      {onTrack ? (
                        <p className="text-xs text-green-600">On track</p>
                      ) : (
                        <p className="text-xs text-amber-600">Needs boost</p>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleContribute(goal.name)}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Add Contribution
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
