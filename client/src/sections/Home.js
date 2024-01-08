import LoginButton from "../components/LoginButton.js";
import React from "react";

// Home page before signing in

export default class Home extends React.Component {
  render() {
    return (
      <div className="hero">
        <h1>HELLO MUSIC LOVERS!</h1>
        <h1>CHOOSE YOUR TEAM</h1>
        <h2>PAIR YOUR FAVORITE SPOTIFY ARTISTS WITH THEIR POKEMON TYPES</h2>
        <LoginButton />
      </div>

      
    );
  }
}
