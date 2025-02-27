import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="px-6 py-1 flex items-center gap-10">
        <h1 className="text-9xl font-semibold text-[#151515]">404</h1>
        <div>
          <Link
            to="/"
            className="btn bg-[#151515] text-white rounded-lg mb-5"
          >
            Go Back Home
          </Link>
          <p className="text-lg text-[#151515]">
            Oops! The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;