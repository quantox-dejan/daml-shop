import Layout from "@components/Layout/Layout";
import { NoShopsYet } from "@components/NoShopsYet/NoShopsYet";
import { Shop } from "@components/Shop/Shop";
import { Titlebar } from "@components/Titlebar/Titlebar";
import { Grid, Space } from "@mantine/core";
import type { NextPage } from "next";
import { useListAllUserShops } from "queries/useListAllUserShops";
import componentClasses from "./index.module.css";

const IndexPage: NextPage = () => {
  const { isLoading, data } = useListAllUserShops();
  const placeholderShops = [
    { id: "1", name: "Lorem Ipsum" },
    { id: "2", name: "Ipsum Dolor" },
    { id: "3", name: "Dolor Sin Amet" },
  ];

  return (
    <Layout>
      <Titlebar title="Shops index" />
      <Space h={20} />
      <Grid className={componentClasses.shopsGrid}>
        {isLoading ? (
          <>
            {placeholderShops?.map((x) => (
              <Grid.Col md={4} lg={4} key={x.id}>
                <Shop usePlaceholder />
              </Grid.Col>
            ))}
          </>
        ) : (
          <>
            {data?.length ? (
              data?.map((x) => (
                <Grid.Col md={4} lg={4} key={x.contractId}>
                  <Shop shop={x.payload} />
                </Grid.Col>
              ))
            ) : (
              <Grid.Col span={12}>
                <NoShopsYet />
              </Grid.Col>
            )}
          </>
        )}
      </Grid>
    </Layout>
  );
};

export default IndexPage;
