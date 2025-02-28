import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import useAxios from "./useAxios";

export default function useTask() {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const axiosPublic = useAxios();
  // Fetch tasks using React Query
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks", email], // Unique query key
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/tasks/${email}`
      );
      return data;
    },
    enabled: !!email, // Only run query if email exists
  });

  return { tasks, isLoading, refetch };
}
