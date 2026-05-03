import { Outlet, NavLink } from "react-router";
import { LayoutDashboard, Receipt, Wallet, Building2, Target } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 pb-20 overflow-auto">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-inset-bottom">
        <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600"
              }`
            }
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </NavLink>

          <NavLink
            to="/accounts"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600"
              }`
            }
          >
            <Building2 className="w-6 h-6" />
            <span className="text-xs">Accounts</span>
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600"
              }`
            }
          >
            <Receipt className="w-6 h-6" />
            <span className="text-xs">Activity</span>
          </NavLink>

          <NavLink
            to="/budgets"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600"
              }`
            }
          >
            <Wallet className="w-6 h-6" />
            <span className="text-xs">Budgets</span>
          </NavLink>

          <NavLink
            to="/goals"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-600"
              }`
            }
          >
            <Target className="w-6 h-6" />
            <span className="text-xs">Goals</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
