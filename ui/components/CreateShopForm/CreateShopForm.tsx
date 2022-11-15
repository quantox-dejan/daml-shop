import { UserShopDto } from "@context/NearContext";
import {
  Button,
  Card,
  LoadingOverlay,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useCreateShopMutation } from "queries/useCreateShopMutation";
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import componentClasses from "./CreateShopForm.module.css";

export const CreateShopForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<UserShopDto>();
  const { mutateAsync, isLoading, error } = useCreateShopMutation();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      router.push("/shops/my");
    }
  }, [isSubmitSuccessful, router]);

  const onSubmit: SubmitHandler<UserShopDto> = (data) => mutateAsync(data);
  return (
    <Card>
      <div className={componentClasses.wrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextInput
                placeholder="Shop name"
                label="Shop name"
                required
                {...field}
              />
            )}
          />
          <Space h={20} />
          <Button type="submit">Register</Button>
        </form>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
      </div>
    </Card>
  );
};
