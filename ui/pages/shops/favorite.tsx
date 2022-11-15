import Layout from "@components/Layout/Layout";
import { Title } from "@mantine/core";
import type { NextPage } from "next";

const FavoriteShopsPage: NextPage = () => {
  return (
    <Layout signInRequired>
      <Title order={3}>❤️ Favorite shops</Title>
    </Layout>
  );
};

export default FavoriteShopsPage;
