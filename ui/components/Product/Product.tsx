import { ProductDto } from "@context/NearContext";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  createStyles,
  Group,
  Text,
  Title,
} from "@mantine/core";
import {
  IconHeart,
  IconHeartPlus,
  IconShoppingCart,
  IconStar,
} from "@tabler/icons";
import { utils } from "near-api-js";
import componentStyles from "./Product.module.css";

interface Props {
  product?: ProductDto;
  usePlaceholder?: boolean;
  onBuyClick?: () => void;
  onFavoriteClick?: () => void;
  onWishlistClick?: () => void;
  my?: boolean;
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  groupPlaceholder: {
    "& > *": { flexGrow: 1 },
  },
  textPlaceholder: {
    backgroundColor: theme.colors.cyan[9],
    borderRadius: "4px",
    width: "75%",
  },
  badgePlaceholder: {
    backgroundColor: theme.colors.cyan[9],
    minWidth: "50px",
  },
  shimmer: {
    "&::before": {
      background: `linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        ${theme.fn.rgba(theme.colors.cyan[9], 0.4)} 50%,
        ${theme.colors.cyan[9]}
      )`,
    },
  },
  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },
  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
  notOnStock: {
    color: theme.colors.red[5],
    borderColor: theme.colors.red[5],
  },
}));

const mockdata = [
  { label: "Lorem" },
  { label: "Ipsum" },
  { label: "Dolor" },
  { label: "Sit Amet" },
];

export const Product = (props: Props) => {
  const { classes } = useStyles();
  const {
    product,
    usePlaceholder,
    onBuyClick,
    onFavoriteClick,
    onWishlistClick,
  } = props;

  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <Text className={usePlaceholder ? classes.textPlaceholder : ""} size="xs">
        {usePlaceholder ? <div>&nbsp;</div> : feature.label}
      </Text>
    </Center>
  ));

  if (usePlaceholder) {
    return (
      <Card
        withBorder
        radius="md"
        className={`${classes.card} ${classes.shimmer} ${componentStyles.shimmer}`}
      >
        <Group
          position="apart"
          mt="md"
          className={`${classes.groupPlaceholder} ${componentStyles.productName}`}
        >
          <div>
            <Text weight={500} className={classes.textPlaceholder}>
              &nbsp;
            </Text>
          </div>
          <Badge className={classes.badgePlaceholder} variant="outline">
            &nbsp;
          </Badge>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Text
            size="sm"
            color="dimmed"
            className={`${classes.label} ${classes.textPlaceholder}`}
          >
            &nbsp;
          </Text>

          <Group className={classes.groupPlaceholder} spacing={8} mb={-8}>
            {features}
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Group className={classes.groupPlaceholder} spacing={30}>
            <div>
              <Text
                className={classes.textPlaceholder}
                size="xl"
                weight={700}
                sx={{ lineHeight: 1 }}
              >
                &nbsp;
              </Text>
            </div>

            <Button disabled radius="xl" style={{ flex: 1 }}></Button>
          </Group>
        </Card.Section>
      </Card>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart" mt="md" className={componentStyles.productName}>
        <div>
          <Text weight={500}>{product.name}</Text>
        </div>
        {product.quantity_on_stock > 0 ? (
          <Badge variant="outline">Available</Badge>
        ) : (
          <Badge className={classes.notOnStock} variant="outline">
            Not available
          </Badge>
        )}
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text size="sm" color="dimmed" className={classes.label}>
          Description
        </Text>

        <Group spacing={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
              {Number(utils.format.formatNearAmount(product.price)).toFixed(4) +
                " N"}
            </Text>
          </div>

          <Button
            leftIcon={<IconShoppingCart />}
            disabled={!product.quantity_on_stock}
            radius="xl"
            style={{ flex: 1 }}
            onClick={onBuyClick}
          >
            Buy now
          </Button>
          <Group>
            <ActionIcon size="sm" radius="xl" onClick={onFavoriteClick}>
              <IconHeart />
            </ActionIcon>
            <ActionIcon size="sm" radius="xl" onClick={onWishlistClick}>
              <IconStar />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};
