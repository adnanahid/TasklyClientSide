import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);

  const logOut = () => {
    handleLogout();
  };

  return (
    <div className="navbar text-white bg-[#151515] flex justify-between">
      <div className="flex items-center">
        <NavLink to="/" className="btn btn-ghost text-xl">
          <img src="/logo.jpg" alt="" className="w-8 h-8" />
        </NavLink>
      </div>
      <div>
        {user && (
          <div className="space-x-5">
            <button
              className="btn border-none shadow-none bg-[#151515] hover:bg-[#323232] text-white"
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
        )}
      </div>
    </div>
  );
}
