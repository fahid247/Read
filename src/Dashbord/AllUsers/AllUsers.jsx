import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "success",
        title: "Role Updated",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleRoleChange = (user, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to make this user a ${role}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${role}`,
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id: user._id, role });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6 inter">
      <h2 className="text-4xl playfair text-primary underline font-bold mb-8 text-center">
        <span className="text-base-content">All</span> <span className="text-primary">Registered</span> <span className="text-base-content">Users</span>
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
                    onClick={() => handleRoleChange(user, "librarian")}
                  >
                    Make Librarian
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    disabled={user.role === "admin"}
                    onClick={() => handleRoleChange(user, "admin")}
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
              <h3 className="font-semibold">
                {user.displayName || "No Name"}
              </h3>
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
                  onClick={() => handleRoleChange(user, "librarian")}
                >
                  Librarian
                </button>
                <button
                  className="btn btn-xs btn-success flex-1"
                  disabled={user.role === "admin"}
                  onClick={() => handleRoleChange(user, "admin")}
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
