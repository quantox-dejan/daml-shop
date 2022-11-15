import Layout from "@components/Layout/Layout";
import { ListUserShopProducts } from "@components/ListUserShopProducts/ListUserShopProducts";
import { LoadingOverlay, Text, Title } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetMyShop } from "queries/useGetMyShop";
import { useGetUserShopById } from "queries/useGetUserShopById";

const UserShopPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, isLoading, isSuccess, error } = useGetUserShopById(
    id as string
  );

  const { data: myShopData } = useGetMyShop();
  return (
    <Layout>
      {isSuccess && !data ? null : isSuccess && !!data ? (
        <ListUserShopProducts
          shopName={data?.name ?? "User shop"}
          id={data.id}
          my={data.id === myShopData?.id}
        />
      ) : error ? (
        <Text>{JSON.stringify(error)}</Text>
      ) : null}
      <LoadingOverlay visible={isLoading} overlayBlur={3} />
    </Layout>
  );
};

export default UserShopPage;
