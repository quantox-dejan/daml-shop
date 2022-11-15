import Layout from "@components/Layout/Layout";
import { Title } from "@mantine/core";
import type { NextPage } from "next";

const PurchaseHistoryPage: NextPage = () => {
  return (
    <Layout>
      <Title order={3}>Purchase history</Title>
    </Layout>
  );
};

export default PurchaseHistoryPage;
