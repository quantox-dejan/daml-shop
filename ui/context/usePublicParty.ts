import { useGetWellKnownParties } from "queries/useGetWellKnownParties";

export const usePublicParty = () => {
  const { data } = useGetWellKnownParties();
  if (!data) {
    return undefined;
  }

  return data.parties?.find(
    (x) => x.displayName?.toLocaleLowerCase() === "public"
  );
};
