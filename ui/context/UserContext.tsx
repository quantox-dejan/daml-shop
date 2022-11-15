import React, { PropsWithChildren, useContext } from "react";
import { History } from "history";
import { getInitState, getParty, UserState } from "./utils";
import Cookies from "js-cookie";
import { createToken, httpBaseUrl, tokenCookieName, wsBaseUrl } from "config";
import DamlLedger from "@daml/react";
import { WellKnownPartiesContext } from "./wellKnownParties";

type LoginSuccess = {
  type: "LOGIN_SUCCESS";
  token: string;
  party: string;
  partyName: string;
};

type LoginFailure = {
  type: "LOGIN_FAILURE";
  error: string;
};

type SignoutSuccess = {
  type: "SIGN_OUT_SUCCESS";
};

type LoginAction = LoginSuccess | LoginFailure | SignoutSuccess;
const UserStateContext = React.createContext<UserState>({
  isAuthenticated: false,
});

const UserDispatchContext = React.createContext<React.Dispatch<LoginAction>>(
  {} as React.Dispatch<LoginAction>
);

const userReducer = (state: UserState, action: LoginAction): UserState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        isAuthenticated: true,
        token: action.token,
        party: action.party,
        partyName: action.partyName,
      };
    case "LOGIN_FAILURE":
      return { isAuthenticated: false, error: action.error };
    case "SIGN_OUT_SUCCESS":
      return { isAuthenticated: false, error: undefined };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const wkp = useContext(WellKnownPartiesContext);
  const publicParty = wkp.parties?.find(
    (x) => x.displayName?.toLocaleLowerCase() === "public"
  );
  const initState: UserState = getInitState(publicParty);
  const [state, dispatch] = React.useReducer<
    React.Reducer<UserState, LoginAction>
  >(userReducer, initState);

  return (
    <DamlLedger
      token={state.token}
      party={state.party}
      httpBaseUrl={httpBaseUrl}
      wsBaseUrl={wsBaseUrl}
    >
      <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider value={dispatch}>
          {children}
        </UserDispatchContext.Provider>
      </UserStateContext.Provider>
    </DamlLedger>
  );
};

export const useUserState = () => {
  const context = React.useContext<UserState>(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
};

export const useUserDispatch = () => {
  const context =
    React.useContext<React.Dispatch<LoginAction>>(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};

export const tryLocalLogin = (
  dispatch: React.Dispatch<LoginAction>,
  partyName: string,
  publicParty: string,
  history: History,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setError(false);
  setIsLoading(true);

  getParty(partyName)
    .then((party) => {
      if (!party) {
        dispatch({ type: "LOGIN_FAILURE", error: "Unknown user" });
        setError(true);
        return;
      }

      const token = createToken(party.identifier, publicParty);
      Cookies.set(tokenCookieName, token);
      dispatch({
        type: "LOGIN_SUCCESS",
        token,
        party: party.identifier,
        partyName: party.displayName ?? party.identifier,
      });
      setError(false);
      setIsLoading(false);
      history.push("/app");
    })
    .catch((e) => {
      dispatch({
        type: "LOGIN_FAILURE",
        error: e.message ? e.message : JSON.stringify(e),
      });
      setError(true);
      console.error(e);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
