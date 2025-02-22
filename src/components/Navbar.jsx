import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";

export default function Navbar() {
  const navigate = useNavigate({});
  const { user, setUser, handleGoogleSignIn, handleLogout } =
    useContext(AuthContext);
  const axiosPublic = useAxios();

  const handleGoogle = () => {
    handleGoogleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        const userDetails = {
          uid: loggedUser.uid,
          name: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        };

        axiosPublic
          .post(
            "https://taskly-server-side.vercel.app/userDetails",
            userDetails
          )
          .then((response) => {
            navigate("/");
            toast.success("Login Successful");
          })
          .catch((error) => {
            toast.error("Login Failed");
          });
      })
      .catch((error) => {
        toast.error("Login Failed");
      });
  };

  const logOut = () => {
    handleLogout();
  };

  return (
    <div className="navbar text-white bg-[#151515] flex justify-between">
      <div className="flex items-center">
        <img src="/logo.jpg" alt="" className="w-8 h-8" />
        <NavLink to="/" className="btn btn-ghost text-xl">
          TaskLy
        </NavLink>
      </div>
      <div>
        {user ? (
          <div className="space-x-5">
            <button
              className="btn btn-sm border-none shadow-none bg-[#151515] hover:bg-[#323232] text-white"
              onClick={logOut}
            >
              Logout
            </button>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleGoogle}
            className="btn border-none shadow-none btn-sm bg-[#151515] text-white"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
