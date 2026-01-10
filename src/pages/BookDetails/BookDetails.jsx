import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";
import Loading from "../../Components/Loading/Loading";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/* ================== Animations ================== */
const fromTop = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fromBottom = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.15 },
  },
};

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/AllBooks/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  /* ================== Order ================== */
  const handleOrder = async (e) => {
    e.preventDefault();

    const form = e.target;
    const orderInfo = {
      bookId: book._id,
      bookName: book.name,
      price: book.price,
      name: user.displayName,
      email: user.email,
      phone: form.phone.value,
      address: form.address.value,
      orderStatus: "pending",
      paymentStatus: "unpaid",
      orderedAt: new Date(),
      librarianEmail: book.librarianEmail,
    };

    await axiosSecure.post("/orders", orderInfo);

    Swal.fire({
      icon: "success",
      title: "Order placed successfully!",
      timer: 1500,
      showConfirmButton: false,
    });

    document.getElementById("order_modal").close();
    navigate("/dashboard/my-orders");
  };

  /* ================== Wishlist ================== */
  const handleWishList = async () => {
    const wishInfo = {
      bookId: book._id,
      BookImage: book.image,
      bookName: book.name,
      price: book.price,
      name: user.displayName,
      email: user.email,
      wishedAt: new Date(),
      librarianEmail: book.librarianEmail,
    };

    await axiosSecure.post("/wishList", wishInfo);

    Swal.fire({
      icon: "success",
      title: "Added to wishlist",
      timer: 1500,
      showConfirmButton: false,
    });

    document.getElementById("wish_modal").close();
  };

  return (
    <section className="min-h-screen bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        
        {/* ================= Image (From Top) ================= */}
        <motion.div
          variants={fromTop}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.04 }}
          className="flex justify-center"
        >
          <img
            src={book.image}
            alt={book.name}
            className="rounded-2xl shadow-2xl max-h-130 object-cover"
          />
        </motion.div>

        {/* ================= Details (From Bottom) ================= */}
        <motion.div
          variants={fromBottom}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-base-content">
              {book.name}
            </h1>
            <p className="text-lg text-base-content/70 mt-1">
              by {book.author}
            </p>
          </div>

          <p className="text-base-content/80 leading-relaxed">
            {book.description}
          </p>

          {/* Info Card */}
          <div className="grid grid-cols-2 gap-4 bg-base-100 p-5 rounded-xl shadow-sm text-sm">
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Rating:</strong> ⭐ {book.rating}</p>
            <p><strong>Status:</strong> {book.status}</p>
          </div>

          <p className="text-3xl font-bold text-primary">
            ৳{book.price}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              className="btn btn-primary px-8"
              onClick={() =>
                document.getElementById("order_modal").showModal()
              }
            >
              Order Now
            </button>

            <button
              className="btn bg-pink-500 text-white hover:bg-pink-600 px-6"
              onClick={() =>
                document.getElementById("wish_modal").showModal()
              }
            >
              <FaHeart /> Wishlist
            </button>
          </div>
        </motion.div>
      </div>

      {/* ================= Order Modal ================= */}
      <dialog id="order_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Place Your Order</h3>
          <form onSubmit={handleOrder} className="space-y-3">
            <input readOnly value={user?.displayName} className="input input-bordered w-full" />
            <input readOnly value={user?.email} className="input input-bordered w-full" />
            <input name="phone" placeholder="Phone Number" className="input input-bordered w-full" required />
            <textarea name="address" placeholder="Delivery Address" className="textarea textarea-bordered w-full" required />
            <div className="modal-action">
              <button className="btn btn-primary">Confirm</button>
              <button type="button" className="btn" onClick={() => document.getElementById("order_modal").close()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* ================= Wishlist Modal ================= */}
      <dialog id="wish_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add to Wishlist</h3>
          <div className="modal-action">
            <button className="btn bg-pink-500 text-white" onClick={handleWishList}>
              Add
            </button>
            <button className="btn" onClick={() => document.getElementById("wish_modal").close()}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default BookDetails;
