const express = require("express");
const app = express();
// use for .env variables
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("App is listening on port 3000");
});

app.get("/", (req, res) => {
  let scope = "user-top-read";
  res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECTURI}&scope=${scope}&show_dialog=true`);
})

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
  
  const data = await axios.get(
    "https://api.spotify.com/v1/me/top/artists?limit=5",
    {
      headers: {
        Authorization: "Bearer " + spotifyRes.data.access_token,
      },
    }
  )
  
  for (let artist of data.data.items) {
    console.log(artist.name);
  }
  

})


