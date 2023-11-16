const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

//this is the page user is redirected to after accepting data use on spotify's website
//it does not have to be /account, it can be whatever page you want it to be
let axios = require("axios");
let queryString = require("querystring");

app.get("/callback", async (req, res) => {
  const spotifyRes = await axios.post(
    "https://accounts.spotify.com/api/token",
    queryString.stringify({
      grant_type: "authorization_code",
      code: req.query.code,
      redirect_uri: "http://localhost:3000/callback/",
    }),
    {
      headers: {
        Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const access_token = spotifyRes.data.access_token;
  const refresh_token = spotifyRes.data.refresh_token;
  const maxAge = spotifyRes.data.expires_in;
  const expiration = new Date(Number(new Date()) + (maxAge * 1000));

  res.cookie('token', access_token, { expires: expiration, httpOnly: false });
  res.cookie('refresh', refresh_token);
  res.redirect("/");
})

app.get('/refresh', async (req, res) => {
  const spotifyRes = await axios.post(
    "https://accounts.spotify.com/api/token",
    queryString.stringify({
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
    {
      headers: {
        Authorization: "Basic " + process.env.BASE64_AUTHORIZATION
      },
    }
  );
  const access_token = spotifyRes.data.access_token;
  const maxAge = spotifyRes.data.expires_in;
  const expiration = new Date(Number(new Date()) + (maxAge * 1000));

  res.cookie('token', access_token, { expires: expiration, httpOnly: false });
  res.send({ access_token, type: 'refresh' });
})

app.get('/api/log-out', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('refresh');
  res.redirect("/");
})


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})

app.listen(PORT, () => {
  console.log("App is listening on port 3000");
});
