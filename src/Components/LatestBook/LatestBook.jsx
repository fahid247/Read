import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
import useAxios from "../../Hooks/UseAxios";

const LatestBooks = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const { data: books = [], isLoading, isError } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const res = await axios.get("/public/books?limit=8");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.1)" },
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load books.</p>;

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-[clamp(2rem,3vw,3rem)] playfair font-bold text-primary">
            Latest Books
          </h2>
          <button
            onClick={() => navigate("/allbooks")}
            className="btn playfair bg-primary text-primary-content hover:bg-accent transition-all duration-300 px-6 py-2 rounded-lg shadow"
          >
            View All
          </button>
        </div>

        {/* Books Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 inter"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <motion.article
                key={book._id}
                className="bg-base-100 dark:border dark:border-base-300  rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={book.image}
                    alt={book.name}
                    loading="lazy"
                    className="h-52 w-full object-cover transition-transform duration-500 ease-out"
                    whileHover={{ scale: 1.05 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg playfair font-semibold line-clamp-1 hover:text-primary transition-colors">
                      {book.name}
                    </h3>
                    <p className="text-sm text-base-content/70">{book.author}</p>
                    <div className="flex justify-between text-sm text-base-content/60 mt-1">
                      <span className="capitalize">{book.category}</span>
                      <span>{book.pages} pages</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <p className="text-sm font-medium text-yellow-500">
                      ★ {book.rating}
                    </p>
                    <button
                      onClick={() => navigate(`/book-details/${book._id}`)}
                      className="btn playfair btn-sm bg-primary text-primary-content hover:bg-accent transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <p className="text-center col-span-full text-base-content/50">
              No books available.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBooks;
