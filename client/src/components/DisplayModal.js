import React, { Component} from 'react';
import { genreTypes } from "../constants/pokemonTypes.js"

export default class DisplayModal extends Component {
    
    render () {
        // artistsInfo contains genre, name, and img
        const { artistsInfo } = this.props;
        
        artistsInfo.map((artist) => {
            if (artist.genre == null) {
                artist.type = "Normal"
            }
            else {
                Object.keys(genreTypes).map(genre => {
                    if (artist.genre == genre) artist.type = genreTypes[genre];
                })
            }
            return 0;
        })

        // Object.keys(genreTypes).map(type => {
        //     return console.log(type + " " + genreTypes[type]);
        // })
        
        return (
            <div>
               {
                artistsInfo.map((artist) => {
                    return <h1>{artist.name} - {artist.type}</h1>
                })
               }
               {
                
               }
            </div>
        )
    }
}
