import { Button, Center, Text } from "@mantine/core";
import { useRouter } from "next/router";

export const NoShopsYet = () => {
  const router = useRouter();
  return (
    <Center sx={{ flexDirection: "column", gap: "5px" }}>
      <Text weight={600} size={20}>
        💔 No shop yet
      </Text>
      <div>
        <Button onClick={() => router.push("/shops/register")}>
          Register your own
        </Button>
      </div>
    </Center>
  );
};
