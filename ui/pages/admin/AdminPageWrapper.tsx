import { useAdminParty } from "@context/useAdminParty";
import { useParty } from "@daml/react";
import { PropsWithChildren, useEffect, useState } from "react";

export const AdminPageWrapper = ({ children }: PropsWithChildren<unknown>) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const party = useParty();
  const adminParty = useAdminParty();
  useEffect(() => {
    if (party !== adminParty?.identifier) {
      location.replace("/");
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return null;
  }

  return <>{children}</>;
};
