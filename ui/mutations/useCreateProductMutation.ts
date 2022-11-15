import { Product } from "@daml.js/shop-contract-0.0.1/lib/Product";
import { useLedger } from "@daml/react";
import { useMutation } from "@tanstack/react-query";

export const useCreateProductMutation = () => {
  const ledger = useLedger();

  return useMutation(["products", "create"], (args: Product) =>
    ledger.create<Product, Product.Key, string>(Product, args)
  );
};
