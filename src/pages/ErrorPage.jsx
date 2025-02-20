import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-center">
      <div className="max-w-md px-6 py-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          It may have been moved or deleted.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
