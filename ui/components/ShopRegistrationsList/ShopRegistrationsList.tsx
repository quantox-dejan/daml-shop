import Layout from "@components/Layout/Layout";
import { Titlebar } from "@components/Titlebar/Titlebar";
import { Grid, Space } from "@mantine/core";
import { useListAllUserShopRegistrations } from "queries/useListAllUserShopRegistrations";
import componentClasses from "./ShopRegistrationsList.module.css";
import { Shop } from "../Shop/Shop";
import { ShopRegistration } from "../ShopRegistration/ShopRegistration";

const ShopRegistrationsList = () => {
  const { isLoading, data } = useListAllUserShopRegistrations();
  const placeholderShops = [
    { id: "1", name: "Lorem Ipsum" },
    { id: "2", name: "Ipsum Dolor" },
    { id: "3", name: "Dolor Sin Amet" },
  ];
  return (
    <Layout>
      <Titlebar title="User shop registrations" />
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
            {data?.length
              ? data?.map((x) => (
                  <Grid.Col md={4} lg={4} key={x.contractId}>
                    <ShopRegistration shop={x.payload} />
                  </Grid.Col>
                ))
              : null}
          </>
        )}
      </Grid>
    </Layout>
  );
};

export default ShopRegistrationsList;
