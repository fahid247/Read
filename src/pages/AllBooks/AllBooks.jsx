import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth";
import Loading from "../../Components/Loading/Loading";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 18px 35px rgba(0,0,0,0.18)",
  },
};

const AllBooks = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("");

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["AllBooks"],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get("/AllBooks");
      return res.data;
    },
  });

  if (loading || isLoading) return <Loading />;

  /* ================= Filter ================= */
  let filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchText.toLowerCase())
  );

  /* ================= Sort ================= */
  if (sortOption === "price") {
    filteredBooks.sort((a, b) => a.price - b.price);
  } else if (sortOption === "pages") {
    filteredBooks.sort((a, b) => a.pages - b.pages);
  }

  return (
    <section className="py-20 bg-base-200 min-h-screen">
      <div className="container mx-auto px-6">
        {/* ================= Header ================= */}
        <div className="text-center mb-12">
          <h2 className="text-[clamp(2.2rem,3vw,3rem)] font-bold text-primary">
            {user.role === "librarian" ? "My Books" : "All Books"}
          </h2>
          <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
            Browse our curated collection of books from trusted librarians
            across Bangladesh.
          </p>
        </div>

        {/* ================= Search & Sort ================= */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-14 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search by book name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full rounded-full px-5 py-3 border border-base-300 
                       focus:outline-none focus:ring-2 focus:ring-primary bg-base-100"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded-full px-5 py-3 border border-base-300 
                       focus:outline-none focus:ring-2 focus:ring-primary bg-base-100"
          >
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="pages">Pages</option>
          </select>
        </div>

        {/* ================= Books Grid ================= */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <motion.article
                key={book._id}
                className="bg-base-100 rounded-xl  dark:border dark:border-base-300 overflow-hidden cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={book.image}
                    alt={book.name}
                    loading="lazy"
                    className="h-56 w-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold line-clamp-1 hover:text-primary transition">
                    {book.name}
                  </h3>

                  <p className="text-sm text-base-content/70">{book.author}</p>

                  <div className="flex justify-between text-sm text-base-content/70">
                    <span>{book.category}</span>
                    <span>{book.pages} pages</span>
                  </div>

                  <p className="text-sm font-medium">Price: ৳{book.price}</p>

                  <button
                    onClick={() => navigate(`/book-details/${book._id}`)}
                    className="mt-4 btn btn-sm bg-primary text-primary-content hover:bg-accent transition"
                  >
                    View Details
                  </button>
                </div>
              </motion.article>
            ))
          ) : (
            <p className="col-span-full text-center text-base-content/60">
              No books found.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AllBooks;
