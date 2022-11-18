import { usePublicParty } from "@context/usePublicParty";
import { createSignOutAction, useUserDispatch } from "@context/UserContext";
import { tokenCookieName } from "config";
import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignOutPage: NextPage = () => {
  const router = useRouter();
  const returnUrl = router.query.returnUrl as string | undefined;
  const dispatch = useUserDispatch();
  const publicParty = usePublicParty();
  useEffect(() => {
    if (!publicParty) {
      return;
    }

    Cookies.remove(tokenCookieName);
    dispatch(createSignOutAction(publicParty.identifier));
    router.replace(returnUrl ?? "/");
  }, [dispatch, publicParty]);

  return null;
};

export default SignOutPage;
