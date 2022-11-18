import * as jwt from "jsonwebtoken";

export const isLocalDev = process.env.NODE_ENV === "development";
export const jsonApiPort = 7575;
const localUserAdminDisplayName = "Admin";
export const userAdminDisplayName = isLocalDev
  ? localUserAdminDisplayName
  : "UserAdmin";

const hostParts = global?.window && window.location.host.split(".");
const applicationId = "sandbox";
export const ledgerId = isLocalDev ? applicationId : hostParts[0];

// Unfortunately, the development server of `create-react-app` does not proxy
// websockets properly. Thus, we need to bypass it and talk to the JSON API
// directly in development mode.
export const wsBaseUrl = isLocalDev
  ? `ws://localhost:${jsonApiPort}/`
  : undefined;

const apiUrl = global?.window && hostParts.slice(1);
if (global?.window) {
  apiUrl.unshift("api");
}

export const createToken = (
  party: string,
  publicParty: string,
  partyName?: string
) =>
  jwt.sign(
    {
      "https://daml.com/ledger-api": {
        ledgerId,
        applicationId,
        admin: true,
        actAs: [party],
        readAs: [party, publicParty],
      },
      party,
      partyName,
    },
    "secret"
  );

export const tokenCookieName = "DAMLHUB_LEDGER_ACCESS_TOKEN";
export const httpBaseUrl = isLocalDev
  ? global?.window &&
    window.location.protocol +
      "//" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : "") +
      "/api/"
  : "https://" +
    apiUrl.join(".") +
    (window.location.port ? ":" + window.location.port : "") +
    "/data/" +
    ledgerId +
    "/";
export const damlHubLoginUrl =
  global?.window &&
  hostParts.join(".") +
    (window.location.port ? ":" + window.location.port : "") +
    "/.hub/v1/auth/login";
