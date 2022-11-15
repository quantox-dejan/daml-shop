import { LoadingOverlay, Modal } from "@mantine/core";
import { useGetWellKnownParties } from "queries/useGetWellKnownParties";
import { createContext, PropsWithChildren } from "react";
import { WellKnownParties } from "./utils";

export const WellKnownPartiesContext = createContext<WellKnownParties>({
  parties: [],
});

export const WellKnownPartiesProvider = ({ children }: PropsWithChildren) => {
  const { isLoading, data, error } = useGetWellKnownParties();
  if (isLoading) {
    return <LoadingOverlay visible />;
  }

  if (error || !data) {
    return (
      <Modal
        opened={true}
        closeOnEscape={false}
        closeOnClickOutside={false}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose={() => {}}
      ></Modal>
    );
  }

  return (
    <WellKnownPartiesContext.Provider value={data}>
      {children}
    </WellKnownPartiesContext.Provider>
  );
};
