import { UserShopRegistration } from "@daml.js/shop-contract-0.0.1/lib/UserShop";
import { useLedger } from "@daml/react";
import { useQuery } from "@tanstack/react-query";

export const useListAllUserShopRegistrations = () => {
  const ledger = useLedger();

  return useQuery(["shops", "all"], () =>
    ledger.query<UserShopRegistration, undefined, string>(UserShopRegistration)
  );
};
