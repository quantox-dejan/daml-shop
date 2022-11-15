import { Box, Button, Card, Center, Container, Text } from "@mantine/core";
import Router from "next/router";

export const PleaseSignIn = () => {
  return (
    <Container>
      <Card>
        <Center>
          <Box mr={10}>
            <Text>🚀 Please</Text>
          </Box>
          <Button onClick={() => Router.push("/signin")}>Sign in</Button>
          <Box ml={10}>
            <Text>to use the Daml Shop</Text>
          </Box>
        </Center>
      </Card>
    </Container>
  );
};
