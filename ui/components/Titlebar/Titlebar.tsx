import { Card, Group, Title } from "@mantine/core";
import { PropsWithChildren } from "react";
import componentClasses from "./Titlebar.module.css";

interface Props extends PropsWithChildren {
  title: string;
}

export const Titlebar = ({ title, children }: Props) => {
  return (
    <Card>
      <Group align="center" position="right">
        <Title className={componentClasses.title} order={3}>
          {title}
        </Title>
        {children}
      </Group>
    </Card>
  );
};
