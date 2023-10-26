import React from 'react';
import { Route } from 'react-router-dom';
import artistTypes from './artistTypes.js';
// When user signs in, we redirect to this page. 
// Returns Topartist here
export default class Main extends React.Component{
    render() {
        const token = this.props;
      
      
    return (
        <main>
            <Route exact path='/' render={(props) =>
                <artistTypes token={token} {...props}/>
            }/>
            <h1> HOOSE YOUR TEAM.</h1>
            <p>PAIR YOUR FAVORITE SPOTIFY ARTISTS WITH THEIR POKEMON TYPES</p>
        </main>
    )

    };
  
  }
  
  
  