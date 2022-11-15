import Layout from "@components/Layout/Layout";
import { ListUserShopProducts } from "@components/ListUserShopProducts/ListUserShopProducts";
import { Titlebar } from "@components/Titlebar/Titlebar";
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetMyShop } from "queries/useGetMyShop";
import { useGetProduct } from "queries/useGetProduct";

const UserShopPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { id, productId },
  } = useRouter();
  const { data, isLoading, isSuccess, error } = useGetProduct(
    id as string,
    productId as string
  );

  const { data: myShopData } = useGetMyShop();
  return (
    <Layout>
      <Titlebar title={data?.name ?? "Product name"}>
        <Button
          leftIcon={<IconArrowBack />}
          compact
          variant="subtle"
          onClick={() => router.push(`/shops/${id}`)}
        >
          Shop
        </Button>
      </Titlebar>
      <LoadingOverlay visible={isLoading} overlayBlur={3} />
    </Layout>
  );
};

export default UserShopPage;
