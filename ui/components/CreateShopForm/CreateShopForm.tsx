import { useAdminParty } from "@context/useAdminParty";
import { usePublicParty } from "@context/usePublicParty";
import { UserShopRegistration } from "@daml.js/shop-contract-0.0.1/lib/UserShop";
import { useParty } from "@daml/react";
import { Button, Card, LoadingOverlay, Space, TextInput } from "@mantine/core";
import { useCreateShopMutation } from "mutations/useCreateShopMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import componentClasses from "./CreateShopForm.module.css";

type FormData = Omit<UserShopRegistration, "requester" | "public" | "admin">;

export const CreateShopForm = () => {
  const router = useRouter();
  const party = useParty();
  const publicParty = usePublicParty();
  const adminParty = useAdminParty();

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<FormData>();
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

  if (!adminParty || !publicParty) {
    return null;
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData: UserShopRegistration = {
      ...data,
      requester: party,
      admin: adminParty.identifier,
      public: publicParty.identifier,
    };
    return mutateAsync(formData);
  };

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
