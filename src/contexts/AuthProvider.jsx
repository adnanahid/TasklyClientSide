import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  // Google Sign-In Function
  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  // Logout Function
  const handleLogout = () => {
    return signOut(auth);
  };

  // Persist User Session
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   return () => unsubscribe(); // Cleanup subscription on unmount
  // }, []);

  // Auth Context Data
  const authInfo = { user, setUser, handleGoogleSignIn, handleLogout };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
