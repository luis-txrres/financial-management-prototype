import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Building2, CreditCard, PiggyBank, Plus, Shield, X } from "lucide-react";
import { toast } from "sonner";

type AccountType = "Checking" | "Savings" | "Credit";

interface Account {
  id: number;
  name: string;
  type: AccountType;
  institution: string;
  balance: number;
  lastSync: string;
  status: string;
}

const ICON_MAP = {
  Checking: Building2,
  Savings: PiggyBank,
  Credit: CreditCard,
};

function AddAccountModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (account: Account) => void;
}) {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [type, setType] = useState<AccountType>("Checking");
  const [balance, setBalance] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !institution.trim() || balance === "") {
      toast.error("Missing fields", { description: "Please fill in all fields." });
      return;
    }

    onAdd({
      id: Date.now(),
      name: name.trim(),
      institution: institution.trim(),
      type,
      balance: Number(balance),
      lastSync: "Just now",
      status: "connected",
    });

    toast.success("Account linked", { description: `${name} has been added to your accounts.` });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-lg font-semibold">Link Bank Account</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-sm text-slate-600 block mb-1">Account Name</label>
            <Input
              placeholder="e.g., Chase Checking"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-600 block mb-1">Institution</label>
            <Input
              placeholder="e.g., Chase Bank"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-600 block mb-1">Account Type</label>
            <Select value={type} onValueChange={(v) => setType(v as AccountType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Checking">Checking</SelectItem>
                <SelectItem value="Savings">Savings</SelectItem>
                <SelectItem value="Credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-slate-600 block mb-1">Starting Balance</label>
            <Input
              type="number"
              placeholder="e.g., 1500.00"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
        </div>

        <div className="p-5 pt-0 space-y-2">
          <Button className="w-full hover:bg-blue-500 hover:text-white transition-colors" onClick={handleSubmit}>
            Link Account
          </Button>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Accounts() {
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: "Chase Checking",  type: "Checking", institution: "Chase Bank",        balance:  8458.50, lastSync: "2 hours ago", status: "connected" },
    { id: 2, name: "Savings Account", type: "Savings",  institution: "Chase Bank",        balance: 15200.00, lastSync: "2 hours ago", status: "connected" },
    { id: 3, name: "Credit Card",     type: "Credit",   institution: "American Express",  balance: -1200.00, lastSync: "5 hours ago", status: "connected" },
  ]);

  const handleAdd = (account: Account) => {
    setAccounts((prev) => [...prev, account]);
  };

  return (
    <div className="p-4 md:p-8">
      {showModal && (
        <AddAccountModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl mb-1">Accounts</h1>
          <p className="text-sm text-slate-600">Your connected accounts</p>
        </div>
        <Button size="sm" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {accounts.map((account) => {
          const Icon = ICON_MAP[account.type];
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
                  <p className={`text-2xl ${isNegative ? "text-red-600" : ""}`}>
                    {isNegative && "-"}${Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Last synced</span>
                    <span>{account.lastSync}</span>
                  </div>
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
