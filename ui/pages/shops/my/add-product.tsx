import { CreateProductForm } from "@components/CreateProductForm/CreateProductForm";
import Layout from "@components/Layout/Layout";
import { Titlebar } from "@components/Titlebar/Titlebar";
import { Button, Card, Group, Space, Title } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";

const AddProductPage: NextPage = () => {
  const router = useRouter();
  return (
    <Layout signInRequired>
      <Titlebar title="Add a new product">
        <Button
          leftIcon={<IconArrowBack />}
          compact
          variant="subtle"
          onClick={() => router.push("/shops/my")}
        >
          Return to the shop
        </Button>
      </Titlebar>
      <Space h={20} />
      <CreateProductForm />
    </Layout>
  );
};

export default AddProductPage;
