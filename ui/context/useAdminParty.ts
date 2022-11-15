import { userAdminDisplayName } from "config";
import { useGetWellKnownParties } from "queries/useGetWellKnownParties";

export const useAdminParty = () => {
  const { data } = useGetWellKnownParties();
  if (!data) {
    return undefined;
  }

  return data.parties?.find(
    (x) => x.displayName?.toLocaleLowerCase() === userAdminDisplayName
  );
};
