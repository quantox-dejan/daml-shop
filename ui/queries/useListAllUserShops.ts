import { UserShop } from "@daml.js/shop-contract-0.0.1/lib/UserShop";
import { useLedger } from "@daml/react";
import { useQuery } from "@tanstack/react-query";

export const useListAllUserShops = () => {
  const ledger = useLedger();

  return useQuery(["shops", "all"], () =>
    ledger.query<UserShop, UserShop.Key, string>(UserShop)
  );
};
