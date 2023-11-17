import React from "react";
import Main from "./sections/Main.js";
import NavBar from "./components/Navbar";
import axios from "axios";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
    };
    this.setToken = this.setToken.bind(this);
  }

  componentDidMount() {
    const tokenCookie = document.cookie.match(/token=([^;]*).*$/);
    const refreshCookie = document.cookie.match(/refresh=([^;]*).*$/);
    const token = tokenCookie ? tokenCookie[1] : null;
    const refresh = refreshCookie ? refreshCookie[1] : null;
    const params = new URL(window.location).searchParams;

    if (token) {
      this.setToken(token);
    } else if (!token && refresh) {
      axios.get(`/?refresh=${refresh}`).then((response) => {
        this.setToken(response.data.access_token);
      });
    } else {
      window.sessionStorage.setItem("referrer", params.get("referrer"));
      return null;
    }
  }

  setToken(token) {
    this.setState({ token: token });
  }

  render() {
    const token = this.state.token;
    return (
      <div>
        <NavBar loggedIn={token ? true : false} />
        <Main token={token} />
      </div>
    );
  }
}
