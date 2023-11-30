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
            artistsInfo:[]
        }
        this.handleClick = this.handleClick.bind(this);
        this.setTopArtists = this.setTopArtists.bind(this);
    }
    handleClick(value) {
        this.setState({ timeRange: value }, () => {
            this.setTopArtists(this.state.timeRange);
        });
        
        
        // once clicked we will take the value (timeframe) and make API call
    }

    async setTopArtists(timeRange) {
        const response = await getTopArtists(this.props.token, timeRange);
        const { data: { items } } = response;
        this.setState({ artistsInfo: items.map(item => ({
            name: item.name,
            genre: item.genres[0],
            imgURI: item.images[2].url
        }))}, () => {
            console.log(this.state.artistsInfo);
        });
       
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
   