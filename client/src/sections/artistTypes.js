import React from 'react';
import Home from './Home.js';
import SelectOptions from "../components/Options.js";
import { timeRangeFilters } from "../constants/filter.js";
import { getTopArtists } from "../helper/spotify.js";

export default class ArtistTypes extends React.Component {
    constructor() {
        super();
        this.state = {
            timeRange: '',
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(value) {
        console.log(value)
        this.setState({ timeRange: value }, () => {
        });
        // once clicked we will take the value (timeframe) and make API call
    }
    render() {
        const { token } = this.props;
        let content;
        // If we don't have a token, return to home
        if (token.token === '') { return <Home /> }
        // Proceed to ArtistTypes
        else {
            content =
                <div>
                    <h1>Select your team!</h1>
                    {Object.keys(timeRangeFilters).map(key => {
                        console.log(key);
                        return <SelectOptions
                            key={key}
                            value={key}
                            clickHandler={this.handleClick}
                        >
                            {timeRangeFilters[key]}
                        </SelectOptions>
                    })
                    }
                </div>
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}
   