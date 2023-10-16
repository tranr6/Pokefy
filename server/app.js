const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());

//this is the page user is redirected to after accepting data use on spotify's website
//it does not have to be /account, it can be whatever page you want it to be
let axios = require("axios");
let queryString = require("querystring");

app.get("/", (req,res) => {
  res.cookie('name', 'express');
  res.send("Server is up and running!");
})

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
  const expiration = new Date(Number(new Data()) + (maxAge * 1000));
  
  res.cookie('token', spotifyRes.data.access_token, { expires: expiration, httpOnly: true});
  res.cookie('refresh', refresh_token);
  
  //res.json({ access_token: spotifyRes.data.access_token });
  res.redirect("/");
})

app.listen(PORT, () => {
  console.log("App is listening on port 3000");
});
