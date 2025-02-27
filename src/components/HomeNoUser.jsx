import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";
import { motion } from "framer-motion";

export const HomeNoUser = () => {
  const { setUser, handleGoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxios();

  const handleGoogle = () => {
    handleGoogleSignIn()
      .then((result) => {
        const loggedUser = result?.user;
        setUser(loggedUser);
        const userDetails = {
          uid: loggedUser.uid,
          name: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        };

        axiosPublic
          .post("/userDetails", userDetails)
          .then((response) => {
            // Check the response message to handle the user registration
            if (response.data.message === "User already exists") {
              toast.success("Welcome back!");
            } else {
              navigate("/"); // Navigate to the homepage for new users
              toast.success("Login Successful");
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error("Login failed. Please try again.");
          });
      })
      .catch((error) => {
        toast.error("Login Failed. Please try again.");
      });
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.h1
        className="text-6xl font-semibold text-[#151515] mb-5"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Welcome to TaskLy.
      </motion.h1>

      <motion.p
        className="text-lg font-medium text-[#151515] mb-5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
      >
        Please Login first to explore
      </motion.p>

      <motion.button
        onClick={handleGoogle}
        className="btn border-none shadow-none bg-[#151515] text-white px-6 py-2 rounded-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        Sign in with Google
      </motion.button>
    </motion.div>
  );
};
