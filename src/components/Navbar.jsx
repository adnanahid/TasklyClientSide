import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

export default function Navbar() {
  const navigate = useNavigate({});
  const { user, setUser, handleGoogleSignIn } = useContext(AuthContext);

  const handleGoogle = () => {
    handleGoogleSignIn()
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {});
  };

  const logOut = () => {
    handleLogout()
      .then(() => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar text-white bg-[#191919] flex justify-between">
      <div className="flex items-center">
        <img src="/logo.jpg" alt="" className="w-8 h-8" />
        <NavLink to="/" className="btn btn-ghost text-xl">
          TaskLy
        </NavLink>
      </div>
      <div>
        {user ? (
          <div className="space-x-5">
            <NavLink to="/login" className="">
              <button
                className="btn btn-sm bg-[#191919] text-white"
                onClick={logOut}
              >
                Logout
              </button>
            </NavLink>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={handleGoogle}
            className="btn btn-sm bg-[#191919] text-white"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
