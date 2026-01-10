import React from "react";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaHeartBroken } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const MyWishList = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: wishList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wish", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myWishList/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load wishlist.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 inter">
      {/* Page Title */}
      <h2 className="text-4xl text-primary underline font-bold mb-8 text-center playfair">
        <span className="text-base-content">My</span> <span className="text-primary">Wish</span> <span className="text-base-content">List</span>
      </h2>

      {/* Empty State */}
      {wishList.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <FaHeartBroken className="text-6xl mb-4" />
          <p className="text-lg">Your wishlist is empty</p>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishList.map((item) => (
            <div
              key={item._id}
              className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Book Image */}
              <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={item.BookImage}
                  alt={item.bookName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold line-clamp-2 playfair">
                  {item.bookName}
                </h3>

                <p className="text-sm text-gray-500">
                  Wished on{" "}
                  {new Date(item.wishedAt).toLocaleDateString()}
                </p>

                <div className="flex items-center justify-between pt-3">
                  <span className="text-primary font-bold text-lg">
                    ৳ {item.price}
                  </span>

                  {/* Remove Button (UI only) */}
                  <button
                    className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                    title="Remove from wishlist"
                  >
                    <MdDeleteOutline size={18} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishList;
