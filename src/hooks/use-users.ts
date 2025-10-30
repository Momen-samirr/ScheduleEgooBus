"use client";
import { getUsers } from "@/lib/actions/user.action";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  const result = useQuery({
    queryKey: ["getAllUsers"],
    // queryFn will receive the JSON string, parse it into objects
    queryFn: async () => {
      const res = await getUsers();
      // handle null/undefined defensively
      if (!res) return [];
      return JSON.parse(res as string);
    },
  });
  return result;
};
