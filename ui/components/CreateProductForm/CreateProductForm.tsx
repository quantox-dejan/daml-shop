import { Button, Card, LoadingOverlay, Space, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import componentClasses from "./CreateProductForm.module.css";
import { useParty } from "@daml/react";
import { Product } from "@daml.js/shop-contract-0.0.1/lib/Product";
import { usePublicParty } from "@context/usePublicParty";
import { useCreateProductMutation } from "mutations/useCreateProductMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = Omit<Product, "owner" | "public" | "user_shop_id">;

interface Props {
  userShopId: string;
}

export const CreateProductForm = ({ userShopId }: Props) => {
  const router = useRouter();
  const party = useParty();
  const publicParty = usePublicParty();
  const { mutateAsync: createProduct, isLoading } = useCreateProductMutation();

  const schema = yup
    .object({
      name: yup.string().required(),
      price: yup
        .string()
        .required()
        .matches(/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/),
      amount: yup
        .string()
        .required()
        .matches(/-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      router.push("/shops/my");
    }
  }, [isSubmitSuccessful, router]);

  if (!publicParty) {
    return null;
  }

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const data: Product = {
      ...formData,
      owner: party,
      user_shop_id: userShopId,
      public: publicParty.identifier,
    };

    return createProduct(data);
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
                placeholder="Product name"
                label="Product name"
                required
                error={errors.name?.message}
                {...field}
              />
            )}
          />
          <Space h={20} />
          <Controller
            name="price"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextInput
                placeholder="Price in N"
                label="Price in N"
                required
                error={errors.price?.message}
                {...field}
              />
            )}
          />
          <Space h={20} />
          <Controller
            name="amount"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextInput
                placeholder="Initial quantity"
                label="Initial quantity"
                required
                error={errors.amount?.message}
                {...field}
              />
            )}
          />
          <Space h={20} />
          <Button type="submit">Save</Button>
        </form>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
      </div>
    </Card>
  );
};
