import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/UseAuth";
import { Link } from "react-router";
import Loading from "../../Components/Loading/Loading";

const MyBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["my-books", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/AllBooks?librarianEmail=${user.email}`);
      return res.data;
    },
  });

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      return axiosSecure.patch(`/AllBooks/${id}`, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-books"]);
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="p-6 inter">
      <h2 className="text-4xl text-primary underline font-bold mb-8 text-center playfair">
        <span className="text-base-content">My</span> <span className="text-primary">Added</span> <span className="text-base-content">Books</span>
      </h2>

      {books.length === 0 ? (
        <p>You haven't added any books yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Book Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book, index) => (
                <tr key={book._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="font-medium">{book.name}</td>

                  <td>
                    <span
                      className={`badge ${
                        book.status === "Published"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {book.status}
                    </span>
                  </td>

                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/edit-book/${book._id}`}
                      className="btn btn-sm btn-primary hover:btn-info"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        toggleStatusMutation.mutate({
                          id: book._id,
                          newStatus:
                            book.status === "Published" ? "unpublished" : "Published",
                        })
                      }
                      className={`btn btn-sm ${
                        book.status === "Published" ? "btn-warning hover:btn-accent" : "btn-success"
                      }`}
                    >
                      {book.status === "Published" ? "Unpublish" : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyBooks;
