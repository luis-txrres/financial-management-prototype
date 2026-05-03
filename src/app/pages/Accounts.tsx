import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Building2, CreditCard, PiggyBank, Plus, RefreshCw, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Accounts() {
  const [syncing, setSyncing] = useState<number | null>(null);

  const accounts = [
    {
      id: 1,
      name: "Chase Checking",
      type: "Checking",
      institution: "Chase Bank",
      balance: 8458.50,
      lastSync: "2 hours ago",
      icon: Building2,
      status: "connected",
    },
    {
      id: 2,
      name: "Savings Account",
      type: "Savings",
      institution: "Chase Bank",
      balance: 15200.00,
      lastSync: "2 hours ago",
      icon: PiggyBank,
      status: "connected",
    },
    {
      id: 3,
      name: "Credit Card",
      type: "Credit",
      institution: "American Express",
      balance: -1200.00,
      lastSync: "5 hours ago",
      icon: CreditCard,
      status: "connected",
    },
  ];

  const handleSync = (accountId: number, accountName: string) => {
    setSyncing(accountId);
    setTimeout(() => {
      setSyncing(null);
      toast.success(`${accountName} synced successfully`, {
        description: "Your transactions are up to date",
      });
    }, 1500);
  };

  const handleAddAccount = () => {
    toast.info("Add Account", {
      description: "Account linking feature coming soon",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl mb-1">Accounts</h1>
          <p className="text-sm text-slate-600">Your connected accounts</p>
        </div>
        <Button onClick={handleAddAccount} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => {
          const Icon = account.icon;
          const isNegative = account.balance < 0;

          return (
            <Card key={account.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>{account.institution}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {account.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{account.type} Balance</p>
                  <p className={`text-2xl ${isNegative ? 'text-red-600' : ''}`}>
                    {isNegative && '-'}${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-slate-600">Last synced</span>
                    <span>{account.lastSync}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSync(account.id, account.name)}
                    disabled={syncing === account.id}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${syncing === account.id ? 'animate-spin' : ''}`} />
                    {syncing === account.id ? 'Syncing...' : 'Sync Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <CardTitle className="text-blue-900">Security & Privacy</CardTitle>
              <CardDescription className="text-blue-700">
                Your financial data is protected with industry-leading security
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>• 256-bit encryption for all data transmission and storage</p>
          <p>• Read-only access to your accounts - we cannot move money</p>
          <p>• Multi-factor authentication required for sensitive operations</p>
          <p>• Regular security audits and compliance with financial regulations</p>
        </CardContent>
      </Card>
    </div>
  );
}
