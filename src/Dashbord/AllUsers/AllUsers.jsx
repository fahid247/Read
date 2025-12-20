import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Change role mutation
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return axiosSecure.patch(`/users/role/${id}`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        All Registered Users
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.displayName || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-outline capitalize">
                    {user.role || "user"}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-info"
                    disabled={user.role === "librarian"}
                    onClick={() =>
                      roleMutation.mutate({
                        id: user._id,
                        role: "librarian",
                      })
                    }
                  >
                    Make Librarian
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    disabled={user.role === "admin"}
                    onClick={() =>
                      roleMutation.mutate({
                        id: user._id,
                        role: "admin",
                      })
                    }
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <h3 className="font-semibold">{user.name || "No Name"}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>

              <div className="my-2">
                <span className="badge badge-outline capitalize">
                  {user.role || "user"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-xs btn-info flex-1"
                  disabled={user.role === "librarian"}
                  onClick={() =>
                    roleMutation.mutate({
                      id: user._id,
                      role: "librarian",
                    })
                  }
                >
                  Librarian
                </button>
                <button
                  className="btn btn-xs btn-success flex-1"
                  disabled={user.role === "admin"}
                  onClick={() =>
                    roleMutation.mutate({
                      id: user._id,
                      role: "admin",
                    })
                  }
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
