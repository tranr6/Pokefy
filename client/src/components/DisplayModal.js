import React, { Component } from 'react';
import { genreTypes } from "../constants/pokemonTypes.js"


export default class PokemonTeam extends Component {

    // Function that adds the corresponding types to each artists
    pairGenreTypes(artistsInfo) {
        artistsInfo.forEach((artist) => {
            if (artist.genre == null) {
                artist.type = "Normal"
            }
            else {
                // O(n) maybe binary search for O(logn)?
                Object.keys(genreTypes).forEach(genre => {
                    if (artist.genre === genre) artist.type = genreTypes[genre];
                })
            }
        })
    }

    render() {
        // artistsInfo contains genre, name, and img
        const { artistsInfo } = this.props;
        this.pairGenreTypes(artistsInfo);

        return (
            <div>
                {
                    artistsInfo.map((artist) => {
                        return <h1>{artist.name} - {artist.type}</h1>
                    })
                }

            </div>
        )
    }
}
