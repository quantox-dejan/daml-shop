import { LoginForm } from "@components/LoginForm/LoginForm";
import { NextPage } from "next";
import { useRouter } from "next/router";

const SignInPage: NextPage = () => {
  const router = useRouter();
  const returnUrl = router.query.returnUrl as string | undefined;
  return <LoginForm returnUrl={returnUrl} />;
};

export default SignInPage;
