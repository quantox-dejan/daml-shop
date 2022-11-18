import { Box, Button, Card, Center, Container, Text } from "@mantine/core";
import { useRouter } from "next/router";

export const PleaseSignIn = () => {
  const router = useRouter();
  console.debug({ router });
  return (
    <Container>
      <Card>
        <Center>
          <Box mr={10}>
            <Text>🚀 Please</Text>
          </Box>
          <Button
            onClick={() =>
              router.push(
                `/signin?returnUrl=${encodeURIComponent(router.asPath)}`
              )
            }
          >
            Sign in
          </Button>
          <Box ml={10}>
            <Text>to use the Daml Shop</Text>
          </Box>
        </Center>
      </Card>
    </Container>
  );
};
