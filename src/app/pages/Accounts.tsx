import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Building2, CreditCard, PiggyBank, Plus, Shield, X, ChevronRight, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

type Step = "bank-select" | "credentials" | "mfa" | "linking" | "success" | "error";

const BANKS = [
  { id: "chase",  name: "Chase",           supported: true  },
  { id: "bofa",   name: "Bank of America", supported: true  },
  { id: "wells",  name: "Wells Fargo",     supported: true  },

];

const ERRORS: Record<string, { title: string; desc: string; retry: boolean }> = {
  unsupported:   { title: "Bank not supported",    desc: "This bank isn't currently supported.",                                    retry: false },
  bad_creds:     { title: "Incorrect credentials", desc: "The username or password is incorrect. Please try again.",                retry: true  },
  token_failed:  { title: "Linking failed",        desc: "Unable to complete account linking. No data has been stored.",            retry: false },
};

function AddAccountModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (bank: string) => void }) {
  const [step, setStep]       = useState<Step>("bank-select");
  const [bank, setBank]       = useState<{ id: string; name: string } | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mfa, setMfa]         = useState("");
  const [error, setError]     = useState<string | null>(null);

  const selectBank = (b: typeof BANKS[0]) => {
    if (!b.supported) { setError("unsupported"); setStep("error"); return; }
    setBank(b);
    setStep("credentials");
  };

  const submitCredentials = () => {
    if (!username || !password) return;
    setStep("mfa");
  };

  const submitMfa = () => {
    if (!mfa) return;
    setStep("linking");
    setTimeout(() => {
      if (username === "demo") { setError("bad_creds"); setStep("error"); return; }
      setTimeout(() => setStep("success"), 1500);
    }, 2000);
  };

  const retry = () => {
    setError(null);
    setStep(error === "bad_creds" ? "credentials" : "bank-select");
    if (error !== "bad_creds") setBank(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-semibold">Link Bank Account</h2>
          <button onClick={onClose}><X className="w-4 h-4 text-slate-400" /></button>
        </div>

        {/* Body */}
        <div className="p-5">

          {step === "bank-select" && (
            <div className="space-y-2">
              <p className="text-sm text-slate-500 mb-3">Select your bank</p>
              {BANKS.map((b) => (
                <button key={b.id} onClick={() => selectBank(b)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium">{b.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!b.supported && <span className="text-xs text-slate-400">Unsupported</span>}
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === "credentials" && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500">Enter your {bank?.name} credentials</p>
              <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <p className="text-xs text-slate-400">Tip: use "demo" as username to trigger the error state</p>
            </div>
          )}

          {step === "mfa" && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500">{bank?.name} sent a code to your phone. Enter it below.</p>
              <Input placeholder="6-digit code" value={mfa} onChange={(e) => setMfa(e.target.value)} maxLength={6} />
            </div>
          )}

          {step === "linking" && (
            <div className="flex flex-col items-center py-8 gap-3 text-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="text-sm font-medium">Linking your account…</p>
              <p className="text-xs text-slate-400">Authenticating with {bank?.name}</p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center py-8 gap-3 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <p className="text-sm font-medium">Account linked!</p>
              <p className="text-xs text-slate-400">{bank?.name} is connected and syncing.</p>
            </div>
          )}

          {step === "error" && error && (
            <div className="flex flex-col items-center py-8 gap-3 text-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <p className="text-sm font-medium">{ERRORS[error].title}</p>
              <p className="text-xs text-slate-400">{ERRORS[error].desc}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 space-y-2">
          {step === "credentials" && (
            <>
              <Button className="w-full" onClick={submitCredentials} disabled={!username || !password}>Continue</Button>
              <Button variant="outline" className="w-full" onClick={() => setStep("bank-select")}>Back</Button>
            </>
          )}
          {step === "mfa" && (
            <>
              <Button className="w-full" onClick={submitMfa} disabled={!mfa}>Verify</Button>
              <Button variant="outline" className="w-full" onClick={() => setStep("credentials")}>Back</Button>
            </>
          )}
          {step === "success" && (
            <Button className="w-full" onClick={() => { onSuccess(bank!.name); onClose(); }}>Done</Button>
          )}
          {step === "error" && error && (
            <>
              {ERRORS[error].retry && <Button className="w-full" onClick={retry}>Try Again</Button>}
              <Button variant="outline" className="w-full" onClick={onClose}>Cancel</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ICON_MAP = { Checking: Building2, Savings: PiggyBank, Credit: CreditCard };

export default function Accounts() {
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState([
    { id: 1, name: "Chase Checking",  type: "Checking" as const, institution: "Chase Bank",       balance:  8458.50, lastSync: "2 hours ago", status: "connected" },
    { id: 2, name: "Savings Account", type: "Savings"  as const, institution: "Chase Bank",       balance: 15200.00, lastSync: "2 hours ago", status: "connected" },
    { id: 3, name: "Credit Card",     type: "Credit"   as const, institution: "American Express", balance: -1200.00, lastSync: "5 hours ago", status: "connected" },
  ]);

  const handleSuccess = (bankName: string) => {
    setAccounts((prev) => [...prev, {
      id: Date.now(),
      name: `${bankName} Checking`,
      type: "Checking" as const,
      institution: bankName,
      balance: 0,
      lastSync: "Just now",
      status: "connected",
    }]);
    toast.success("Account linked", { description: `${bankName} has been added.` });
  };

  return (
    <div className="p-4 md:p-8">
      {showModal && <AddAccountModal onClose={() => setShowModal(false)} onSuccess={handleSuccess} />}

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
                  <Badge variant="outline" className="text-green-600 border-green-600">{account.status}</Badge>
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
              <CardDescription className="text-blue-700">Your financial data is protected with industry-leading security</CardDescription>
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

