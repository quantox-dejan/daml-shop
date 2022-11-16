import { UserShop } from "@daml.js/shop-contract-0.0.1/lib/UserShop";
import { useLedger } from "@daml/react";
import { useQuery } from "@tanstack/react-query";

export const useGetUserShopById = (id: string) => {
  const ledger = useLedger();

  const result = useQuery(["shops", id], () =>
    ledger.query<UserShop, UserShop.Key, string>(UserShop, { id })
  );

  return { ...result, data: result.data?.length ? result.data[0] : undefined };
};
