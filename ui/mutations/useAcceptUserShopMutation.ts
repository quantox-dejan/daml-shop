import { useAdminParty } from "@context/useAdminParty";
import {
  Accept,
  UserShop,
  UserShopRegistration,
} from "@daml.js/shop-contract-0.0.1/lib/UserShop";
import { useLedger, useParty } from "@daml/react";
import { ContractId } from "@daml/types";
import { useMutation } from "@tanstack/react-query";

export const useAcceptUserShopMutation = (
  userShopId: ContractId<UserShopRegistration>
) => {
  const ledger = useLedger();
  const admin = useAdminParty();
  const party = useParty();

  if (party !== admin?.identifier) {
    throw new Error("Only admin can accept user shops");
  }

  return useMutation(["shops", userShopId, "accept"], (args: Accept) =>
    ledger.exercise<
      UserShopRegistration,
      Accept,
      ContractId<UserShop>,
      undefined
    >(UserShopRegistration.Accept, userShopId, args)
  );
};
