import { createContext, useContext, useState, ReactNode } from "react";

export type Transaction = {
  id: number;
  date: string;
  merchant: string;
  category: string;
  amount: number; // negative = expense, positive = income
  status: "completed" | "pending";
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
};

const TransactionContext = createContext<TransactionContextType | null>(null);

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 1,  date: "2026-05-02", merchant: "Whole Foods",    category: "Groceries",     amount: -87.32,  status: "completed" },
  { id: 2,  date: "2026-05-02", merchant: "Shell Gas Station", category: "Transportation", amount: -52.00, status: "completed" },
  { id: 3,  date: "2026-05-01", merchant: "Netflix",        category: "Entertainment", amount: -15.99,  status: "completed" },
  { id: 4,  date: "2026-05-01", merchant: "Starbucks",      category: "Dining",        amount: -8.75,   status: "completed" },
  { id: 5,  date: "2026-04-30", merchant: "Salary Deposit", category: "Income",        amount: 3500.00, status: "completed" },
  { id: 6,  date: "2026-04-29", merchant: "Amazon",         category: "Shopping",      amount: -124.99, status: "completed" },
  { id: 7,  date: "2026-04-28", merchant: "Spotify",        category: "Entertainment", amount: -9.99,   status: "completed" },
  { id: 8,  date: "2026-04-27", merchant: "Trader Joe's",   category: "Groceries",     amount: -63.24,  status: "completed" },
  { id: 9,  date: "2026-04-26", merchant: "Uber",           category: "Transportation",amount: -23.50,  status: "pending"   },
  { id: 10, date: "2026-04-25", merchant: "Movie Theater",  category: "Entertainment", amount: -28.00,  status: "completed" },
  { id: 11, date: "2026-04-24", merchant: "Walmart",        category: "Groceries",     amount: -120.45, status: "completed" },
  { id: 12, date: "2026-04-23", merchant: "Costco",         category: "Groceries",     amount: -179.55, status: "completed" },
  { id: 13, date: "2026-04-22", merchant: "Concert Tickets",category: "Entertainment", amount: -85.00,  status: "completed" },
  { id: 14, date: "2026-04-20", merchant: "Video Games",    category: "Entertainment", amount: -59.99,  status: "completed" },
  { id: 15, date: "2026-04-18", merchant: "Gas Station",    category: "Transportation",amount: -50.00,  status: "completed" },
  { id: 16, date: "2026-04-15", merchant: "Chipotle",       category: "Dining",        amount: -12.50,  status: "completed" },
  { id: 17, date: "2026-04-10", merchant: "Target",         category: "Shopping",      amount: -55.00,  status: "completed" },
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const addTransaction = (t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      { ...t, id: Math.max(...prev.map((x) => x.id)) + 1 },
      ...prev,
    ]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used inside TransactionProvider");
  return ctx;
}

// ─── Helper: calculate total spent for a category within a time period ────────

export function calcSpent(
  transactions: Transaction[],
  category: string,
  period: "Daily" | "Weekly" | "Monthly"
): number {
  const now = new Date();

  const start = new Date(now);
  if (period === "Daily") {
    start.setHours(0, 0, 0, 0);
  } else if (period === "Weekly") {
    start.setDate(now.getDate() - now.getDay()); // start of this week (Sunday)
    start.setHours(0, 0, 0, 0);
  } else {
    start.setDate(1); // start of this month
    start.setHours(0, 0, 0, 0);
  }

  return transactions
    .filter((t) => {
      const tDate = new Date(t.date);
      return (
        t.category === category &&
        t.amount < 0 &&
        tDate >= start &&
        tDate <= now
      );
    })
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
}
