import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-140px)]">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}
