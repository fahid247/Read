import React from "react";
import image from "../../assets/ChatGPT Image Jan 10, 2026, 09_24_04 PM.png";
import { useForm } from "react-hook-form";
import ReadOnRouteLogo from "../../Components/Logo/ReadOnRouteLogo";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/UseAuth";
import axios from "axios";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile , signInGoogle} = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user.photoURL);

        // create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored", res.data);
          
        });



         const userProfile = {
                            photoURL: result.user.photoURL 
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                // console.log('user profile updated done.')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error))



      })
      .catch((error) => {
        console.log(error);
      });


     


  };



  const handleRegistration = (data) => {

        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {

                // 1. store the image in form data
                const formData = new FormData();
                formData.append('image', profileImg);

                // 2. send the photo to store and get the ul
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // create user in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })


                        // update user profile to firebase
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                // console.log('user profile updated done.')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error))
                    })



            })
            .catch(error => {
                console.log(error)
            })
    }
  return (
    <div className="flex">
      <div className="form flex-1">
        <div className="min-h-screen flex items-center justify-center bg-base-100">
          <div className="w-full max-w-md p-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-3">
              <Link to={"/"}>
                <ReadOnRouteLogo></ReadOnRouteLogo>
              </Link>
            </div>

            {/* Heading */}
            <h1 className="text-4xl text-base-content font-bold mb-2">
              Register,
            </h1>
            <h2 className="text-4xl text-base-content font-bold mb-3">
              Right Now
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  {...register("name", {
                    required: "name is required",
                  })}
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Photo */}
              <div>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-primary w-full"
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button className="btn btn-primary w-full ">Sign Up</button>
            </form>

            <button onClick={handleGoogleSignIn} className="btn w-full mt-4 bg-white text-black border-[#cfcbcb]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>

            {/* Footer */}
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-primary font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block flex-1">
        <div className="picture  p-3 flex justify-center items-center bg-base-100">
        <img src={image} className="max-h-[92vh] rounded-2xl mx-auto" />
      </div>
      </div>
    </div>
  );
};

export default Register;
