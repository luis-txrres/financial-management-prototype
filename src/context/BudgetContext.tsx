import { createContext, useContext, useState, ReactNode } from "react";

type BudgetProviderProps = {
  children: ReactNode;
};

const BudgetContext = createContext<any>(null);

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [budgets, setBudgets] = useState([
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
        spent: 150,
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
        spent: 180,
        limit: 250,
        period: "Monthly",
        hasAlert: false,
        trend: "up",
        trendPercent: 15,
    },
    ]);


  const updateBudgetLimit = (id: number, newLimit: number) => {
    setBudgets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, limit: newLimit } : b))
    );
  };

  const addBudget = (name: string, limit: number) => {
    setBudgets(prev => [
        ...prev,
        {
        id: prev.length + 1,
        name,
        spent: 0,
        limit,
        period: "Monthly",
        hasAlert: false,
        trend: "down",
        trendPercent: 0,
        }
    ]);
    };
  
  const deleteBudget = (id: number) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
    };


  return (
    <BudgetContext.Provider value={{ budgets, updateBudgetLimit, addBudget, deleteBudget }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudgets() {
  return useContext(BudgetContext);
}