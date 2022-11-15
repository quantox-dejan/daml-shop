import { fetchWellKnownParties } from "@context/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetWellKnownParties = () => {
  return useQuery(["wellKnownParties"], () => fetchWellKnownParties(), {
    staleTime: Infinity,
  });
};
