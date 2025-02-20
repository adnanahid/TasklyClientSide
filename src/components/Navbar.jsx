import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar text-white bg-[#191919] flex justify-between">
      <NavLink to="/" className="btn btn-ghost text-xl">
        daisyUI
      </NavLink>
      <div>
        <NavLink to="/login" className="">
          Login
        </NavLink>
        {/* <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div> */}
      </div>
    </div>
  );
}
