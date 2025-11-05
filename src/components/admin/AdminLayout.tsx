import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ADMIN_GET_STATS } from "@/lib/graphql/queries";

const Sidebar: React.FC = () => {
  const { data } = useQuery(ADMIN_GET_STATS, { fetchPolicy: "network-only" });
  const stats = data?.adminStats || {};

  const navItem = (to: string, label: string, badge?: React.ReactNode) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2 rounded hover:bg-slate-100 ${
          isActive ? "bg-slate-200 font-semibold" : ""
        }`
      }
    >
      <span>{label}</span>
      {badge ? <span className="text-xs text-slate-600">{badge}</span> : null}
    </NavLink>
  );

  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <div className="mb-6">
        <Link to="/admin" className="text-xl font-bold">
          Admin
        </Link>
      </div>
      <nav className="space-y-2">
        {navItem("/admin", "Dashboard")}
        {navItem("/admin/users", "Users", stats?.users ?? "—")}
        {navItem("/admin/articles", "Articles", stats?.articles ?? "—")}
        {navItem("/admin/comments", "Comments", stats?.comments ?? "—")}
        {navItem("/admin/labels", "Labels")}
        {navItem("/admin/faq", "FAQ")}
        {navItem("/admin/subscriptions", "Subscriptions")}
      </nav>
    </aside>
  );
};

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
