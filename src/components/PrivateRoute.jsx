import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { HomeNoUser } from "./HomeNoUser";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  } else {
    return <HomeNoUser></HomeNoUser>;
  }
};

export default PrivateRoute;
