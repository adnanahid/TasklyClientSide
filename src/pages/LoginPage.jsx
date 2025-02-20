import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const Login = () => {
  const navigate = useNavigate({});
  const { setUser, handleGoogleSignIn } = useContext(AuthContext);

  const handleGoogle = () => {
    handleGoogleSignIn()
      .then((result) => {
        setUser(result.user);
        console.log("User signed in:", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error.message);
      });
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <button onClick={handleGoogle} className="btn bg-[#191919] text-white">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
