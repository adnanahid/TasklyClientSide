import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate({});
  const { user, setUser, handleGoogleSignIn, handleLogout } =
    useContext(AuthContext);

  const handleGoogle = () => {
    handleGoogleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        const userDetails = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        };

        axios
          .post("http://localhost:3000/userDetails", userDetails)
          .then((response) => {
            console.log("User saved:", response.data);
            navigate("/");
            toast.success("Login Successful");
          })
          .catch((error) => {
            toast.error("Login Failed");
            console.error("Google sign-in error:", error);
          });
      })
      .catch((error) => {
        toast.error("Login Failed");
        console.error("Google sign-in error:", error);
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
              className="btn btn-sm bg-[#151515] text-white"
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
            className="btn btn-sm bg-[#151515] text-white"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
