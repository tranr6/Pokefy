import React from 'react';


const LoginButton = (props) => {
    const authLink = 'http://accounts.spotify.com/authorize';
    const redirectURI = process.env.REDIRECTURI;
    const clientID = process.env.CLIENT_ID;
    const scope = 'user-top-read';

    const loginLink = `${authLink}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&show_dialog=true`;

    return (        
        <a href={loginLink}>
            Login with Spotify
        </a>
    )
};

export default LoginButton;