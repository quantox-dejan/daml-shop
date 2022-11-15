import Cookies from "js-cookie";
import {
  createToken,
  isLocalDev,
  tokenCookieName,
  userAdminDisplayName,
} from "../config";
import {
  Decoder,
  array,
  object,
  string,
  boolean,
  optional,
} from "@mojotech/json-type-validation";

interface Party {
  displayName?: string;
  identifier: string;
  isLocal: boolean;
}

export interface WellKnownParties {
  parties: Party[];
}

interface WellKnownPartiesResponse extends WellKnownParties {
  loading: boolean;
  error: unknown;
}

const wellKnownEndpoint = () => {
  if (!isLocalDev) {
    return `//${window.location.host}/.hub/v1/default-parties`;
  }

  return `/api/v1/parties`;
};

const wellKnownPartiesDecoder: Decoder<Array<Party>> = array(
  object({
    displayName: optional(string()),
    identifier: string(),
    isLocal: boolean(),
  })
);

export const fetchWellKnownParties =
  async (): Promise<WellKnownPartiesResponse> => {
    try {
      const endpoint = wellKnownEndpoint();
      const response = await fetch(
        endpoint,
        isLocalDev
          ? {
              headers: {
                Authorization: `Bearer ${createToken("public", "public")}`,
              },
            }
          : undefined
      );
      const dablJson = await response.json();
      const parties = wellKnownPartiesDecoder.runWithException(dablJson.result);
      return { parties, loading: false, error: null };
    } catch (error) {
      console.error(
        `Error determining well known parties ${JSON.stringify(error)}`
      );
      return { parties: [], loading: false, error };
    }
  };

export const getUserAdmin = async () => {
  return await getParty(userAdminDisplayName);
};

export const getParty = async (name: string) => {
  const wkp = await fetchWellKnownParties();
  if (!wkp.parties) {
    return undefined;
  }

  return wkp.parties?.find(
    (x) => x.displayName?.toLowerCase() === name.toLowerCase()
  );
};

export type AuthenticatedUser = {
  isAuthenticated: true;
  token: string;
  party: string;
  partyName: string;
};

export type UnAthenticated = {
  isAuthenticated: false;
  error?: string;
  token: string;
  party: string;
  partyName: string;
};

export const isAuthenticated = (
  state: UnAthenticated | AuthenticatedUser
): state is AuthenticatedUser => {
  return state.isAuthenticated;
};

export type UserState = UnAthenticated | AuthenticatedUser;

const b64DecodeUnicode = (str: string) =>
  decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      )
      .join("")
  );

const parseJwt = (token?: string | null) => {
  if (!token) {
    return undefined;
  }

  return JSON.parse(
    b64DecodeUnicode(token.split(".")[1].replace("-", "+").replace("_", "/"))
  );
};

export const getInitState = (publicParty?: Party) => {
  const token = Cookies.get(tokenCookieName);
  const jwt = parseJwt(token);
  if (!publicParty) {
    throw new Error("Unable to resolve the public party from the ledger");
  }

  if (!jwt) {
    return {
      isAuthenticated: false,
      token: createToken(publicParty.identifier, publicParty.identifier),
      party: publicParty.identifier,
      partyName: publicParty.displayName ?? "Public",
    };
  }

  const exp = new Date(Number(jwt.exp) * 1000);
  if (exp < new Date()) {
    return {
      isAuthenticated: false,
      token: createToken(publicParty.identifier, publicParty.identifier),
      party: publicParty.identifier,
      partyName: publicParty.displayName ?? "Public",
    };
  }

  const party = jwt.party;
  const partyName = jwt.partyName;
  if (!party || !partyName) {
    return {
      isAuthenticated: false,
      token: createToken(publicParty.identifier, publicParty.identifier),
      party: publicParty.identifier,
      partyName: publicParty.displayName ?? "Public",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return { isAuthenticated: true, token: token!, party, partyName };
};
