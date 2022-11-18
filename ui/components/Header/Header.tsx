import { useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Burger,
  Title,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconChevronDown,
  IconLogin,
  IconReceipt2,
  IconHome,
} from "@tabler/icons";
import Link from "next/link";
import componentStyles from "./Header.module.css";
import { Logo } from "./Logo";
import { useUserState } from "@context/UserContext";
import { isAuthenticated } from "@context/utils";
import { useRouter } from "next/router";
import { useAdminParty } from "@context/useAdminParty";

const useStyles = createStyles((theme) => ({
  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
    marginBottom: 20,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: 38,
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },
}));

const Header = () => {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const user = useUserState();
  const adminParty = useAdminParty();
  const isAdmin = user.isAuthenticated && adminParty?.identifier === user.party;
  const router = useRouter();

  return (
    <div className={classes.header}>
      <Container fluid className={classes.mainSection}>
        <Group position="apart">
          <Link href="/">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <Logo
                height={36}
                width={36}
                fill={theme.colorScheme === "dark" ? theme.white : theme.black}
              />
              <Title order={2}>Shop</Title>
            </Box>
          </Link>

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />

          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(
                  classes.user,
                  {
                    [classes.userActive]: userMenuOpened,
                  },
                  componentStyles.user
                )}
              >
                <Group spacing={7}>
                  <Avatar radius="xl" size={20} />
                  <div style={{ position: "relative" }}>
                    <Text>
                      {isAuthenticated(user) ? user.partyName : "Not signed in"}
                    </Text>
                  </div>
                  <Text
                    weight={500}
                    size="sm"
                    sx={{ lineHeight: 1 }}
                    mr={3}
                  ></Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {user.isAuthenticated ? (
                <>
                  <Menu.Label>Shops</Menu.Label>
                  <Menu.Item icon={<IconHome size={14} stroke={1.5} />}>
                    <Link href="/shops/my">My shop</Link>
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <IconHeart
                        size={14}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    <Link href="/shops/favorite">Favorite shops</Link>
                  </Menu.Item>
                  <Menu.Label>Items</Menu.Label>
                  <Menu.Item
                    icon={
                      <IconHeart
                        size={14}
                        color={theme.colors.red[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    <Link href="/items/favorite">Favorite items</Link>
                  </Menu.Item>
                  <Menu.Item
                    icon={
                      <IconStar
                        size={14}
                        color={theme.colors.yellow[6]}
                        stroke={1.5}
                      />
                    }
                  >
                    <Link href="/items/wishlist">Wish list</Link>
                  </Menu.Item>
                  {isAdmin ? (
                    <>
                      <Menu.Divider />
                      <Menu.Label>Administration</Menu.Label>
                      <Menu.Item icon={<IconReceipt2 size={14} stroke={1.5} />}>
                        <Link href="/admin/shops">User shop registrations</Link>
                      </Menu.Item>
                    </>
                  ) : null}
                  <Menu.Divider />
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item icon={<IconReceipt2 size={14} stroke={1.5} />}>
                    <Link href="/account/purchase-history">
                      Purchase history
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconLogout size={14} stroke={1.5} />}
                    onClick={() =>
                      router.push(`/signout?returnUrl=${router.asPath}`)
                    }
                  >
                    Sign out
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item
                  icon={<IconLogin size={14} stroke={1.5} />}
                  onClick={() =>
                    router.push(`/signin?returnUrl=${router.asPath}`)
                  }
                >
                  Sign in
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
};

export default Header;
