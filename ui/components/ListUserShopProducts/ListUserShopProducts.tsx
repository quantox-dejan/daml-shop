import { Product } from "@components/Product/Product";
import { Titlebar } from "@components/Titlebar/Titlebar";
import { Button, Center, Grid, Space, Text } from "@mantine/core";
import {
  IconArrowBack,
  IconHeartPlus,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { useListUserShopProducts } from "queries/useListUserShopProducts";
import componentClasses from "./ListUserShopProducts.module.css";

interface Props {
  id: string;
  shopName: string;
  my?: boolean;
}

export const ListUserShopProducts = ({ id, my, shopName }: Props) => {
  const { data, isSuccess, isLoading } = useListUserShopProducts(id);
  const router = useRouter();
  const placeholderProducts = new Array(3).fill(0);

  return (
    <>
      <Titlebar title={shopName}>
        {my ? (
          <Button
            leftIcon={<IconShoppingCartPlus />}
            compact
            variant="subtle"
            onClick={() => router.push("/shops/my/add-product")}
          >
            New product
          </Button>
        ) : null}
        {my ? (
          <Button
            leftIcon={<IconPlus />}
            compact
            variant="subtle"
            onClick={() => router.push("/shops/my/add-coupon")}
          >
            New coupon
          </Button>
        ) : null}
        {!my ? (
          <Button
            leftIcon={<IconHeartPlus />}
            compact
            variant="subtle"
            onClick={() => {}}
          >
            Add to favorites
          </Button>
        ) : null}
        <Button
          leftIcon={<IconArrowBack />}
          compact
          variant="subtle"
          onClick={() => router.push("/")}
        >
          Shops index
        </Button>
      </Titlebar>
      <Space h={20} />
      <Grid className={componentClasses.shopsGrid}>
        {isLoading ? (
          <>
            {placeholderProducts?.map((_, i) => (
              <Grid.Col md={4} lg={4} key={i}>
                <Product usePlaceholder />
              </Grid.Col>
            ))}
          </>
        ) : (
          <>
            {isSuccess && data?.length ? (
              data?.map((x) => (
                <Grid.Col md={4} lg={4} key={x.id}>
                  <Product
                    product={x}
                    my={my}
                    onBuyClick={() => router.push(`/shops/${id}/${x.id}`)}
                  />
                </Grid.Col>
              ))
            ) : (
              <Grid.Col span={12}>
                <Center sx={{ flexDirection: "column", gap: "5px" }}>
                  <Text weight={600} size={20}>
                    💔 No product yet
                  </Text>
                  {my ? (
                    <div>
                      <Button
                        onClick={() => router.push("/shops/my/add-product")}
                      >
                        Add a new one
                      </Button>
                    </div>
                  ) : null}
                </Center>
              </Grid.Col>
            )}
          </>
        )}
      </Grid>
    </>
  );
};
