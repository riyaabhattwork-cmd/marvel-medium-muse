import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, FileText, MessageSquare, Tag, HelpCircle, CreditCard, LogOut } from "lucide-react";
import { removeAuthToken } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

const AdminNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    removeAuthToken();
    toast({
      title: "Logged out successfully",
      description: "See you again soon!",
    });
    navigate("/");
  };

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: Home },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/articles", label: "Articles", icon: FileText },
    { to: "/admin/comments", label: "Comments", icon: MessageSquare },
    { to: "/admin/labels", label: "Labels", icon: Tag },
    { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
    { to: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link to="/admin" className="flex items-center gap-2">
          <h1 className="text-2xl font-serif font-bold text-gray-900">Scribe</h1>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive(item.to)
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminNav;
