import Layout from "@components/Layout/Layout";
import { ListUserShopProducts } from "@components/ListUserShopProducts/ListUserShopProducts";
import { NoShopsYet } from "@components/NoShopsYet/NoShopsYet";
import { LoadingOverlay, Text } from "@mantine/core";
import { NextPage } from "next";
import { useGetMyShop } from "queries/useGetMyShop";

const MyShopPage: NextPage = () => {
  const { data, isLoading, isSuccess, error } = useGetMyShop();
  return (
    <Layout signInRequired>
      {isSuccess && !data ? (
        <NoShopsYet />
      ) : isSuccess && !!data ? (
        <ListUserShopProducts
          id={data.payload.user_shop_id}
          my
          shopName={data.payload.name ?? "My shop"}
        />
      ) : error ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : null}
      <LoadingOverlay visible={isLoading} overlayBlur={3} />
    </Layout>
  );
};

export default MyShopPage;
