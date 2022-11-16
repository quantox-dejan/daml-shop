import { useUserState } from "@context/UserContext";
import { UserShop } from "@daml.js/shop-contract-0.0.1/lib/UserShop";
import { useLedger } from "@daml/react";
import { useQuery } from "@tanstack/react-query";

export const useGetMyShop = () => {
  const ledger = useLedger();
  const user = useUserState();

  return useQuery(
    ["shops", "my"],
    () =>
      ledger.fetchByKey<UserShop, UserShop.Key, string>(UserShop, user.party),
    {
      enabled: user.isAuthenticated,
    }
  );
};
