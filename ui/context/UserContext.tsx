import React, { PropsWithChildren, useContext, useMemo } from "react";
import { getInitState, getParty, UserState } from "./utils";
import Cookies from "js-cookie";
import { createToken, httpBaseUrl, tokenCookieName, wsBaseUrl } from "config";
import DamlLedger from "@daml/react";
import { WellKnownPartiesContext } from "./wellKnownParties";

export enum LoginActionType {
  LoginSuccess,
  LoginFailure,
  SignoutSuccess,
}

export interface ILoginAction {
  type: LoginActionType;
  token: string;
  party: string;
  partyName: string;
  error?: string;
}

const UserStateContext = React.createContext<UserState>({
  isAuthenticated: false,
  token: "",
  party: "",
  partyName: "",
});

const UserDispatchContext = React.createContext<React.Dispatch<ILoginAction>>(
  {} as React.Dispatch<ILoginAction>
);

const userReducer = (state: UserState, action: ILoginAction): UserState => {
  switch (action.type) {
    case LoginActionType.LoginSuccess:
      return {
        isAuthenticated: true,
        token: action.token,
        party: action.party,
        partyName: action.partyName,
      };
    case LoginActionType.LoginFailure:
      return {
        isAuthenticated: false,
        error: action.error,
        token: action.token,
        party: action.party,
        partyName: action.partyName,
      };
    case LoginActionType.SignoutSuccess:
      return {
        isAuthenticated: false,
        error: undefined,
        token: action.token,
        party: action.party,
        partyName: action.partyName,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const wkp = useContext(WellKnownPartiesContext);
  const publicParty = wkp.parties?.find(
    (x) => x.displayName?.toLocaleLowerCase() === "public"
  );
  const initState: UserState = useMemo(() => getInitState(publicParty), []);
  const [state, dispatch] = React.useReducer<
    React.Reducer<UserState, ILoginAction>
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
    React.useContext<React.Dispatch<ILoginAction>>(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};

export const tryLocalLogin = (
  partyName: string,
  publicParty: string
): Promise<ILoginAction> => {
  return getParty(partyName)
    .then((party) => {
      if (!party) {
        return {
          type: LoginActionType.LoginFailure,
          error: "Unknown user",
          party: publicParty,
          partyName: "Not logged in",
          token: createToken(publicParty, publicParty),
        };
      }

      const token = createToken(
        party.identifier,
        publicParty,
        party.displayName
      );
      Cookies.set(tokenCookieName, token);
      return {
        type: LoginActionType.LoginSuccess,
        token,
        party: party.identifier,
        partyName: party.displayName ?? party.identifier,
      };
    })
    .catch((e) => {
      console.error(e);
      return {
        type: LoginActionType.LoginFailure,
        error: e.message ? e.message : JSON.stringify(e),
        party: publicParty,
        partyName: "Not logged in",
        token: createToken(publicParty, publicParty),
      };
    });
};

export const createSignOutAction = (publicParty: string) => {
  Cookies.remove(tokenCookieName);
  return {
    type: LoginActionType.SignoutSuccess,
    party: publicParty,
    partyName: "Not logged in",
    token: createToken(publicParty, publicParty),
  };
};
