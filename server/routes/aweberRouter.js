import dotenv from "dotenv";
import { Router } from "express";
import simpleOauth2 from "simple-oauth2";
import { saveAccessTokenToDb, retriveAccessTokenFromDb } from "../db.js";

dotenv.config();
// initialize the process of accessing aweber acount using the libery simple-oauth2
const oAuth2FlowAweberRouter = Router();

//get authorization code
const config = {
  client: {
    id: process.env.Aweber_client_id,
    secret: process.env.Aweber_secret,
  },

  auth: {
    tokenHost: "https://auth.aweber.com",
    authorizePath: "/oauth2/authorize",
    tokenPath: "/oauth2/token",
  },
};

const { AuthorizationCode } = simpleOauth2;
const client = new AuthorizationCode(config);

oAuth2FlowAweberRouter.get("/", (req, res) => {
  const authorizationUri = client.authorizeURL({
    redirect_uri: "https://dmsl-beta-xrq6.vercel.app/oauth2/authorize",
    scope: [
      "account.read",
      "list.read",
      "subscriber.read",
      "email.read",
      "subscriber.write",
    ],
  });

  res.redirect(authorizationUri);
});

//get access token after user authorize
oAuth2FlowAweberRouter.get("/authorize", async (req, res) => {
  const authorizationCode = req.query.code;

  // Log the code or use it in your application logic
  const tokenParams = {
    code: authorizationCode,
    redirect_uri: "https://dmsl-beta-xrq6.vercel.app/oauth2/authorize",
  };

  try {
    const accessToken = await client.getToken(tokenParams, {
      headers: {
        Authorization: process.env.Aweber_Basic_Authorization,
      },
    });

    await saveAccessTokenToDb(accessToken);
    res.send("we've got the code boys!!!");
  
  } catch (error) {
    console.log("Access Token Error", error.message);
  }
});

//handle the refreshing of the access token
async function refreshAccessToken() {
  let accessToken = client.createToken(await retriveAccessTokenFromDb());
  const EXPIRATION_WINDOW_IN_SECONDS = 300;
  if (accessToken.expired(EXPIRATION_WINDOW_IN_SECONDS)) {
    console.log("access token key has expired");
    try {
      const refreshParams = {
        scope: [
          "account.read",
          "list.read",
          "subscriber.read",
          "email.read",
          "subscriber.write",
        ],
      };

      accessToken = await accessToken.refresh(refreshParams);
      //save new access token to DB
      await saveAccessTokenToDb(accessToken);
    } catch (error) {
      console.log("Error refreshing access token: ", error.message);
    }
  }
}

//check every 15 mins if access code has expire and refresh it
const REFRESH_INTERVAL = 5000; // 15 minutes in milliseconds
setInterval(refreshAccessToken, REFRESH_INTERVAL);

export { oAuth2FlowAweberRouter };
