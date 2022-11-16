import { Product } from "@daml.js/shop-contract-0.0.1/lib/Product";
import { useLedger } from "@daml/react";
import { useQuery } from "@tanstack/react-query";

export const useListUserShopProducts = (userShopId: string) => {
  const ledger = useLedger();

  return useQuery(["shops", userShopId, "products"], () =>
    ledger.query<Product, Product.Key, string>(Product, {
      user_shop_id: userShopId,
    })
  );
};
