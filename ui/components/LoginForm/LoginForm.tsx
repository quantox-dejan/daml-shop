import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { createToken, isLocalDev } from "config";
import {
  LoginActionType,
  tryLocalLogin,
  useUserDispatch,
} from "@context/UserContext";
import { usePublicParty } from "@context/usePublicParty";
import { GoogleIcon } from "./GoogleIcon";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface Props extends PaperProps {
  returnUrl?: string;
}

interface FormData {
  username: string;
  password: string;
  terms: boolean;
}

export const LoginForm = ({ returnUrl, ...props }: Props) => {
  const [type, toggle] = useToggle(["login", "register"]);
  const dispatch = useUserDispatch();
  const publicParty = usePublicParty();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    setError,
  } = useForm<FormData>({
    defaultValues: { username: "", password: "", terms: false },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      router.push(returnUrl ?? "/");
    }
  }, [isSubmitSuccessful, router]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!publicParty) {
      throw new Error("Unable to resolve the public party");
    }

    try {
      const loginResult = await tryLocalLogin(
        data.username,
        publicParty.identifier
      );

      if (loginResult.error) {
        setError("username", { type: "value", message: loginResult.error });
      }

      dispatch(loginResult);
    } catch (e) {
      console.error(e);
      dispatch({
        type: LoginActionType.LoginFailure,
        error: JSON.stringify(e),
        party: publicParty.identifier,
        partyName: "Not logged in",
        token: createToken(publicParty.identifier, publicParty.identifier),
      });
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Daml!
      </Text>
      {!isLocalDev ? (
        <>
          <Group grow mb="md" mt="md">
            <GoogleIcon radius="xl">Continue with Daml hub</GoogleIcon>
          </Group>
          <Divider label="Or login manually" labelPosition="center" my="lg" />
        </>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Controller
            name="username"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextInput
                placeholder="Your username"
                label="Username"
                required
                {...field}
                error={errors.username?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <PasswordInput
                placeholder="Your password"
                label="Password"
                required
                {...field}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            name="terms"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field: { value, ...field } }) => (
              <Checkbox
                label="I accept terms and conditions"
                checked={value}
                {...field}
                error={errors.terms?.message}
              />
            )}
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
};
