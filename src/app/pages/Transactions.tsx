import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Search, Filter, Download, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const transactions = [
    { id: 1, date: "2026-05-02", merchant: "Whole Foods", category: "Groceries", amount: -87.32, status: "completed" },
    { id: 2, date: "2026-05-02", merchant: "Shell Gas Station", category: "Transportation", amount: -52.00, status: "completed" },
    { id: 3, date: "2026-05-01", merchant: "Netflix", category: "Entertainment", amount: -15.99, status: "completed" },
    { id: 4, date: "2026-05-01", merchant: "Starbucks", category: "Dining", amount: -8.75, status: "completed" },
    { id: 5, date: "2026-04-30", merchant: "Salary Deposit", category: "Income", amount: 3500.00, status: "completed" },
    { id: 6, date: "2026-04-29", merchant: "Amazon", category: "Shopping", amount: -124.99, status: "completed" },
    { id: 7, date: "2026-04-28", merchant: "Spotify", category: "Entertainment", amount: -9.99, status: "completed" },
    { id: 8, date: "2026-04-27", merchant: "Trader Joe's", category: "Groceries", amount: -63.24, status: "completed" },
    { id: 9, date: "2026-04-26", merchant: "Uber", category: "Transportation", amount: -23.50, status: "pending" },
    { id: 10, date: "2026-04-25", merchant: "Movie Theater", category: "Entertainment", amount: -28.00, status: "completed" },
  ];

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  const handleExport = () => {
    toast.success("Transactions exported", {
      description: "Your transaction history has been downloaded",
    });
  };

  const handleAddTransaction = () => {
    toast.info("Add Transaction", {
      description: "Manual transaction entry coming soon",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl mb-1">Transactions</h1>
        <p className="text-sm text-slate-600">Your financial activity</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-600">+${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">-${totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-lg">All Transactions</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleAddTransaction}>
                <Plus className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Groceries">Groceries</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Dining">Dining</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-sm">{transaction.merchant}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{transaction.category}</Badge>
                    <span className="text-xs text-slate-500">{transaction.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-slate-900"}`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs mt-1">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
