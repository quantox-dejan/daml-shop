import { useUserState } from "@context/UserContext";
import { AuthenticatedUser } from "@context/utils";
import { UserShop } from "@daml.js/shop-contract-0.0.1/lib/UserShop";
import { useLedger } from "@daml/react";
import { useQuery } from "@tanstack/react-query";

export const useGetMyShop = () => {
  const ledger = useLedger();
  const user = useUserState();

  return useQuery(
    ["shops", "my"],
    () =>
      ledger.query<UserShop, UserShop.Key, string>(UserShop, {
        owner: (user as AuthenticatedUser).party,
      }),
    {
      enabled: user.isAuthenticated,
    }
  );
};
