import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/AllBooks");
      return res.data;
    },
  });

  // Publish / Unpublish
  const handlePublishToggle = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Published" ? "unpublished" : "Published";

    await axiosSecure.patch(`/AllBooks/${id}`, {
      status: newStatus,
    });

    refetch();
  };

  // Delete book
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the book and all related orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/AllBooks/${id}`);
      refetch();
      Swal.fire("Deleted!", "Book and orders removed.", "success");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-2">Manage Books</h1>
      <h2 className="text-xl font-medium mb-6">
        Total Books ({books.length})
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Author</th>
              <th>Librarian</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td className="flex items-center gap-3">
                  <img
                    src={book.image}
                    alt=""
                    className="w-12 h-16 object-cover rounded"
                  />
                  <span className="font-medium">{book.name}</span>
                </td>
                <td>{book.author}</td>
                <td>{book.librarianEmail}</td>
                <td>
                  <span
                    className={`badge mt-12 text-[12px] ${
                      book.status === "Published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() =>
                      handlePublishToggle(book._id, book.status)
                    }
                    className="btn btn-xs btn-info"
                  >
                    {book.status === "Published"
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {books.map((book) => (
          <div key={book._id} className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex gap-4">
                <img
                  src={book.image}
                  alt=""
                  className="w-20 h-28 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold">{book.name}</h3>
                  <p className="text-sm">Author: {book.author}</p>
                  <p className="text-sm">
                    Librarian: {book.librarianEmail}
                  </p>
                  <span
                    className={`badge mt-2 ${
                      book.status === "Published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {book.status}
                  </span>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() =>
                    handlePublishToggle(book._id, book.status)
                  }
                  className="btn btn-sm btn-info"
                >
                  {book.status === "Published"
                    ? "Unpublish"
                    : "Publish"}
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooks;
