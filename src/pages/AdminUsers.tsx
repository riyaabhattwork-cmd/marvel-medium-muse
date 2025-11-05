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
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin — Users ({total})</h2>
        <div className="space-y-3">
          {users.map((u: any) => (
            <div
              key={u.id}
              className="p-3 border rounded flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">
                  {u.username}{" "}
                  <span className="text-sm text-muted-foreground">
                    ({u.email})
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{u.bio}</div>
                <div className="text-xs mt-1">
                  Followers: {u.followersCount} • Following: {u.followingCount}
                </div>
              </div>
              <div className="space-x-2">
                {u.role !== "ADMIN" ? (
                  <button
                    onClick={() => promote(u)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Promote
                  </button>
                ) : (
                  <button
                    onClick={() => demote(u)}
                    className="px-3 py-1 bg-yellow-500 text-black rounded"
                  >
                    Demote
                  </button>
                )}
                <button
                  onClick={() => remove(u)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
