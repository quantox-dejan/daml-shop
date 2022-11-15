import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@context/UserContext";
import { WellKnownPartiesProvider } from "@context/wellKnownParties";
import "../styles.css";

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Daml Shop</title>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <WellKnownPartiesProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </WellKnownPartiesProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
