import React from "react";
import SpotifyLogo from "../assets/spotify.png";

const LoginButton = (props) => {
  
  const authLink = "http://accounts.spotify.com/authorize";
  const redirectURI =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_REDIRECTURI
      : process.env.REACT_APP_REDIRECTURI;
  const clientID = process.env.REACT_APP_CLIENT_ID;
  const scope = "user-top-read";
  const responseType = "code";

  const loginLink = `${authLink}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&&response_type=${responseType}`;

  return (
  <div className="breathing">
    <a className="spotify-button" href={loginLink}><img src= {SpotifyLogo} height= "50px"></img>Login with Spotify</a>
  </div>)
};

export default LoginButton;
