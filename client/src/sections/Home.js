import LoginButton from '../components/LoginButton.js';
import React from 'react';
// Home page before signing in

export default class Home extends React.Component {
  
  render() {
    return (
      <div>
        <h1>HELLO MUSIC LOVERS! CHOOSE YOUR TEAM.</h1>
        <p>PAIR YOUR FAVORITE SPOTIFY ARTISTS WITH THEIR POKEMON TYPES</p>
        <LoginButton />
      </div>
    );
  }

}

