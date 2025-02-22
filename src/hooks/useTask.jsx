import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export default function useTask() {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  // Fetch tasks using React Query
  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["tasks", email], // Unique query key
    queryFn: async () => {
      const { data } = await axios.get(
        `https://taskly-server-side.vercel.app/tasks/${email}`
      );
      return data;
    },
    enabled: !!email, // Only run query if email exists
  });

  return { tasks, isLoading, refetch };
}
