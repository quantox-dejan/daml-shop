import { PropsWithChildren } from "react";
import { Container } from "@mantine/core";
import Header from "../Header/Header";
import { PleaseSignIn } from "./PleaseSignIn";
import { useUserState } from "@context/UserContext";

interface LayoutProps extends PropsWithChildren {
  signInRequired?: boolean;
}

export default function Layout({ children, signInRequired }: LayoutProps) {
  const { isAuthenticated } = useUserState();
  return (
    <Container size="xl">
      <Header />
      {!signInRequired || isAuthenticated ? children : <PleaseSignIn />}
    </Container>
  );
}
