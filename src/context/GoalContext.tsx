import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { useTransactions, calcSpent } from "./TransactionContext";

export type TimePeriod = "Daily" | "Weekly" | "Monthly";

// Internal storage — no spent field, it's computed
type GoalRecord = {
  id: number;
  name: string;
  category: string;
  limit: number;
  period: TimePeriod;
  createdAt: string;
};

// Public shape — includes computed spent
export type Goal = GoalRecord & { spent: number };

type GoalContextType = {
  goals: Goal[];
  addGoal: (name: string, category: string, limit: number, period: TimePeriod) => void;
  updateGoal: (id: number, limit: number, period: TimePeriod) => void;
  deleteGoal: (id: number) => void;
};

const GoalContext = createContext<GoalContextType | null>(null);

const INITIAL_GOALS: GoalRecord[] = [
  { id: 1, name: "Grocery Budget", category: "Groceries",     limit: 600, period: "Monthly", createdAt: "2026-05-01" },
  { id: 2, name: "Fun Money",      category: "Entertainment", limit: 300, period: "Monthly", createdAt: "2026-05-01" },
  { id: 3, name: "Commute Budget", category: "Transportation",limit: 100, period: "Weekly",  createdAt: "2026-05-01" },
  { id: 4, name: "Coffee & Eats",  category: "Dining",        limit: 30,  period: "Daily",   createdAt: "2026-05-01" },
];

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goalRecords, setGoalRecords] = useState<GoalRecord[]>(INITIAL_GOALS);
  const { transactions } = useTransactions();

  // Compute spent live from transactions for each goal
  const goals: Goal[] = useMemo(
    () =>
      goalRecords.map((g) => ({
        ...g,
        spent: calcSpent(transactions, g.category, g.period),
      })),
    [goalRecords, transactions]
  );

  const addGoal = (name: string, category: string, limit: number, period: TimePeriod) => {
    setGoalRecords((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((g) => g.id)) + 1 : 1,
        name,
        category,
        limit,
        period,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const updateGoal = (id: number, limit: number, period: TimePeriod) => {
    setGoalRecords((prev) =>
      prev.map((g) => (g.id === id ? { ...g, limit, period } : g))
    );
  };

  const deleteGoal = (id: number) => {
    setGoalRecords((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const ctx = useContext(GoalContext);
  if (!ctx) throw new Error("useGoals must be used inside GoalProvider");
  return ctx;
}
