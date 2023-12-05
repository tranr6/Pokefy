import axios from 'axios';

export function getTopArtists(access_token, timeRange) {
    let token = access_token.token;
    let tRange = timeRange || "medium_term";
    

    
    const config = { headers: { 
        'Authorization': 'Bearer ' + token
    }};

    return axios.get(`https://api.spotify.com/v1/me/top/artists?limit=6&time_range=${tRange}`, config);
}