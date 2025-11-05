import React from "react";
import AdminNav from "./AdminNav";

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminNav />
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
};

export default AdminLayout;
