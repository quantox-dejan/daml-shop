import { UserShopRegistration } from "@daml.js/shop-contract-0.0.1/lib/UserShop";
import { useLedger } from "@daml/react";
import { useMutation } from "@tanstack/react-query";

export const useCreateShopMutation = () => {
  const ledger = useLedger();

  return useMutation(["shops", "create"], (args: UserShopRegistration) =>
    ledger.create<UserShopRegistration, undefined, string>(
      UserShopRegistration,
      args
    )
  );
};
