import axios from 'axios';


// data = getTopArtists(spotifyRes.data.access_token, timeRange);
// data.data.items.name
export function getTopArtists(access_token, timeRange) {
    var timeRange = timeRange || "medium_term";
    const config = { headers: { 
        'Authorization': "Bearer " + access_token
    }};
    return axios.get(`https://api.spotify.com/v1/me/top/artists?limit=6&time_range=${timeRange}`, config);
}