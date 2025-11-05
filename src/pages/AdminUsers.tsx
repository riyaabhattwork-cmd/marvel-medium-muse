import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ADMIN_GET_USERS } from "@/lib/graphql/queries";
import { ADMIN_UPDATE_USER, ADMIN_DELETE_USER } from "@/lib/graphql/mutations";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminUsers: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(ADMIN_GET_USERS, {
    variables: { page: 1, perPage: 50 },
    fetchPolicy: "network-only",
  });

  const [updateUser] = useMutation(ADMIN_UPDATE_USER);
  const [deleteUser] = useMutation(ADMIN_DELETE_USER);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-semibold">Admin</h3>
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  const users = data?.adminUsers?.users || [];
  const total = data?.adminUsers?.totalCount || 0;

  const promote = async (u: any) => {
    try {
      await updateUser({ variables: { id: u.id, input: { role: "ADMIN" } } });
      refetch();
    } catch (e: any) {
      alert(e.message || "Error promoting user");
    }
  };

  const demote = async (u: any) => {
    try {
      await updateUser({ variables: { id: u.id, input: { role: "USER" } } });
      refetch();
    } catch (e: any) {
      alert(e.message || "Error demoting user");
    }
  };

  const remove = async (u: any) => {
    if (!confirm(`Delete user ${u.username}?`)) return;
    try {
      await deleteUser({ variables: { id: u.id } });
      refetch();
    } catch (e: any) {
      alert(e.message || "Error deleting user");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Total Users: {total}</p>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {users.map((u: any) => (
              <div
                key={u.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {u.username}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {u.email}
                      </span>
                    </div>
                    {u.bio && (
                      <p className="text-sm text-gray-600 mb-3">{u.bio}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="font-medium text-gray-700">{u.followersCount}</span> Followers
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="font-medium text-gray-700">{u.followingCount}</span> Following
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {u.role !== "ADMIN" ? (
                      <button
                        onClick={() => promote(u)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                      >
                        Promote
                      </button>
                    ) : (
                      <button
                        onClick={() => demote(u)}
                        className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
                      >
                        Demote
                      </button>
                    )}
                    <button
                      onClick={() => remove(u)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
