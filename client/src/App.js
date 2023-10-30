import React from 'react';
import Main from './sections/Main.js';
import NavBar from './components/Navbar';
import axios from 'axios';


export default class App extends React.Component {
    constructor() {
        console.log("7");
        super();
        this.state = {
            token: '',
        }
        this.setToken = this.setToken.bind(this);
    }

    componentDidMount() {
        const tokenCookie = document.cookie.match(/token=([^;]*).*$/);
        const refreshCookie = document.cookie.match(/refresh=([^;]*).*$/);
        const token = tokenCookie ? tokenCookie[1] : null;
        const refresh = refreshCookie ? refreshCookie[1] : null;
        const params = new URL(window.location).searchParams;
        console.log("1");
        

        if (token) {
            this.setToken(token);
            console.log("2");
        }
        else if (!token && refresh) {
            axios.get(`/?refresh=${refresh}`).then(response => {
                this.setToken(response.data.access_token);
            });
            console.log("3");
            
        } else {
            window.sessionStorage.setItem('referrer', params.get('referrer'));
            console.log("4");
            return null;
        }           
    }

    setToken(token) {
        this.setState({ token: token});
        console.log("5");
    }

    render() {
        const token = this.state.token;
        console.log("6" + typeof(token));
        return (
            <div>
                <NavBar/>
                <Main token={token}/>
            </div>
        )
    }
};