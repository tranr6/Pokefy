import React from "react";
import Home from './Home.js';
//import { timeRangeFilters } from "../constants/filter.js";

export default class ArtistTypes extends React.Component {
   
    render () {
        const { token } = this.props;
        let content;
        // If we don't have a token, return to home
        if (token.token === '') 
            {return <Home/>}
        // Proceed to ArtistTypes
        else {
            content =
                <div>
                    <h1>Select your team!</h1>
                    <div>
                        <button>Last Month</button>
                        <button>Last 6 Months</button>
                        <button>All Time</button>
                    </div>
                </div>
        }
        
        return (
            <div>{content}</div> 
        ) 
    }
}