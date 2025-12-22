import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const AddBooks = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddBooks = async (data) => {
    const bookData = {
      name: data.name,
      author: data.author,
      image: data.image,
      description: data.description,
      category: data.category,
      status: data.status, // Published | Unpublished
      librarianEmail: user?.email,
      price: Number(data.price),
      rating: Number(data.rating),
      pages: Number(data.pages),
      publisher: data.publisher,
      language: data.language,
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      await axiosSecure.post("/AllBooks", bookData);

      Swal.fire({
        icon: "success",
        title: "Book Added Successfully",
      });

      reset();
      navigate('/dashboard/myBooks');
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add book", "error");
    }

    
    
  };

  return (
    <div className="p-4 md:p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-base-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Book
        </h2>

        <form
          onSubmit={handleSubmit(handleAddBooks)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Book Name */}
          <div>
            <label className="label">Book Name</label>
            <input
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-error text-sm">Required</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="label">Author</label>
            <input
              className="input input-bordered w-full"
              {...register("author", { required: true })}
            />
          </div>

          {/* Image */}
          <div>
            <label className="label">Image URL</label>
            <input
              className="input input-bordered w-full"
              {...register("image", { required: true })}
            />
          </div>

          {/* Category */}
          <div>
            <label className="label">Category</label>
            <input
              className="input input-bordered w-full"
              {...register("category", { required: true })}
            />
          </div>

          {/* Price */}
          <div>
            <label className="label">Price</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
          </div>

          {/* Rating */}
          <div>
            <label className="label">Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              className="input input-bordered w-full"
              {...register("rating")}
            />
          </div>

          {/* Pages */}
          <div>
            <label className="label">Pages</label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("pages")}
            />
          </div>

          {/* Publisher */}
          <div>
            <label className="label">Publisher</label>
            <input
              className="input input-bordered w-full"
              {...register("publisher")}
            />
          </div>

          {/* Language */}
          <div>
            <label className="label">Language</label>
            <input
              className="input input-bordered w-full"
              {...register("language")}
            />
          </div>

          {/* Status */}
          <div>
            <label className="label">Status</label>
            <select
              className="select select-bordered w-full"
              {...register("status", { required: true })}
            >
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
            </select>
          </div>

          {/* Description (Full Width) */}
          <div className="md:col-span-2">
            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              {...register("description", { required: true })}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-4">
            <button type="submit" className="btn btn-primary w-full">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
