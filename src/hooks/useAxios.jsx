import axios from "axios";

export default function useAxios() {
  const axiosPublic = axios.create({
    baseURL: "https://taskly-server-eta.vercel.app",
    // baseURL: "http://localhost:3000",
  });
  return axiosPublic;
}

