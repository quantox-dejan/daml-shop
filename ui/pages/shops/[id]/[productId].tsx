import Layout from "@components/Layout/Layout";
import { Titlebar } from "@components/Titlebar/Titlebar";
import { Button, LoadingOverlay } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useGetProduct } from "queries/useGetProduct";

const UserShopPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { id, productId },
  } = useRouter();
  const { data, isLoading } = useGetProduct(id as string, productId as string);

  return (
    <Layout>
      <Titlebar title={data?.payload.name ?? "Product name"}>
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
