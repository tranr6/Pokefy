const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV !== "development";

app.use(cookieParser());

/**
 * This line sets up a middleware to serve static files from the "client/build" directory.
 * This is useful for serving your front-end assets (HTML, CSS, JavaScript, images, etc.) directly from the server.
 * For example if you have an image in your client/build/images folder called logo.png,
 * you can access it from your index.html file by using <img src="/images/logo.png" />.
 * This is useful because you don't have to worry about setting up a separate server to serve your front-end assets.
 * You can just use the same server that you use for your backend.
 */
app.use(express.static(path.join(__dirname, "../client/build")));

let axios = require("axios");
let queryString = require("querystring");

//this is the page user is redirected to after accepting data use on spotify's website
//it does not have to be /account, it can be whatever page you want it to be
app.get("/callback", async (req, res) => {
  try {
    const spotifyRes = await axios.post(
      "https://accounts.spotify.com/api/token",
      queryString.stringify({
        grant_type: "authorization_code",
        code: req.query.code,

        /**
         * This parameter is used for validation only (there is no actual redirection).
         * The value of this parameter must exactly match the value of redirect_uri supplied
         * when requesting the authorization code.
         */
        redirect_uri: `${
          isProduction
            ? process.env.PRODUCTION_BASE_URL
            : process.env.DEV_BASE_URL
        }/callback`,
      }),
      {
        headers: {
          /**
           * Spotify requires the format to be Authorization: Basic <base64 encoded client_id: client_secret>
           * For example:
           * 'MTIzNDU2Nzg6YWJjZGVmZw==' is the base64 encoded output of the string 12345678:abcdefg
           * (where 12345678 is the client id and abcdefg the client secret).
           */
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.BASE64_AUTHORIZATION}`,
            "utf8"
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const access_token = spotifyRes.data.access_token;
    const refresh_token = spotifyRes.data.refresh_token;
    const maxAge = spotifyRes.data.expires_in;
    const expiration = new Date(Number(new Date()) + maxAge * 1000);

    res.cookie("token", access_token, {
      expires: expiration,
      httpOnly: false,
    });
    res.cookie("refresh", refresh_token);
  } catch (error) {
    console.log("there was an error", error);
  }

  res.redirect("/");
});

app.get("/refresh", async (req, res) => {
  const spotifyRes = await axios.post(
    "https://accounts.spotify.com/api/token",
    queryString.stringify({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    {
      headers: {
        Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
      },
    }
  );
  const access_token = spotifyRes.data.access_token;
  const maxAge = spotifyRes.data.expires_in;
  const expiration = new Date(Number(new Date()) + maxAge * 1000);

  res.cookie("token", access_token, { expires: expiration, httpOnly: false });
  res.send({ access_token, type: "refresh" });
});

app.post("/api/log-out", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refresh");
  res.redirect("/");
});

// catch-all route:
// adding /* will make it so that any route that is not defined will be redirected to the index.html file
// so that react router can handle directing the user to the correct client side route
// an alternative to /* is to pass an array of paths to app.get such as app.get(["/login", "/callback"], (req, res) => {...})

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log("App is listening on port 3000");
});
