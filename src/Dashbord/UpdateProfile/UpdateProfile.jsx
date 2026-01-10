import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    updateUserProfile({ displayName, photoURL })
      .then(() => navigate("/dashboard/my-profile"))
      .finally(() => setLoading(false));
  };

  return (
    <section className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          bg-base-100 rounded-2xl shadow-xl p-8 w-full max-w-md
          dark:border dark:border-base-300
        "
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-base-content">
          Update Profile
        </h2>

        {/* Avatar Preview */}
        {photoURL && (
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full bg-linear-to-br from-primary to-accent p-1">
              <img
                src={photoURL}
                alt="Preview"
                className="w-full h-full rounded-full object-cover bg-base-100"
              />
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-base-content">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="input input-bordered w-full bg-base-200 focus:outline-none"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-2 font-medium text-base-content">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Paste profile image URL"
              className="input input-bordered w-full bg-base-200 focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className={`btn btn-primary w-full ${loading && "loading"}`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={() => navigate("/my-profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default UpdateProfile;
