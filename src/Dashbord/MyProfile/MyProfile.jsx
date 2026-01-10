import React from "react";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth";
import Loading from "../../Components/Loading/Loading";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Loading />;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center bg-base-200">
        <h2 className="text-2xl font-semibold mb-4 text-base-content">
          You are not logged in
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="
          bg-base-100 rounded-2xl shadow-xl p-8 max-w-md w-full text-center
          dark:border dark:border-base-300
        "
      >
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-36 h-36 rounded-full bg-linear-to-br from-primary to-accent p-1">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover bg-base-100"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-base-content">
          {user.displayName}
        </h2>

        {/* Email */}
        <p className="text-base-content/70 mt-1 mb-6">
          {user.email}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-base-300 my-6" />

        {/* Action */}
        <button
          onClick={() => navigate("/dashboard/update-profile")}
          className=" btn btn-primary w-full"
        >
          Update Profile
        </button>
      </motion.div>
    </section>
  );
};

export default MyProfile;
