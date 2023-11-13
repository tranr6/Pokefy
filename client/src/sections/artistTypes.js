import React from "react";
import Home from './Home.js';

export default class ArtistTypes extends React.Component {
   
    render () {
        const { token } = this.props;
        let content;
        // If we don't have a token, return to home
        if (token.token === '') 
            {return <Home/>}
        // Proceed to ArtistTypes
        else {
            content =  <h1>HELLO</h1>
        }
        
        return (
            <div>{content}</div> 
        ) 
    }
}