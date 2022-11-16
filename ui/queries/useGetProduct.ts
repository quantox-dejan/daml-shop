import { Product } from "@daml.js/shop-contract-0.0.1/lib/Product";
import { useLedger } from "@daml/react";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (userShopId: string, productId: string) => {
  const ledger = useLedger();

  const result = useQuery(["shops", "my"], () =>
    ledger.query<Product, Product.Key, string>(Product, {
      user_shop_id: userShopId,
      id: productId,
    })
  );

  return { ...result, data: result.data?.length ? result.data[0] : undefined };
};
