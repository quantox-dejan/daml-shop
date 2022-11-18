import { userAdminDisplayName } from "config";
import { useGetWellKnownParties } from "queries/useGetWellKnownParties";

export const useAdminParty = () => {
  const { data } = useGetWellKnownParties();
  if (!data) {
    return undefined;
  }

  const admin = data.parties?.find(
    (x) => x.displayName?.toLowerCase() === userAdminDisplayName.toLowerCase()
  );
  return admin;
};
