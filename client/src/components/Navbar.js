import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PokifyLogo from "../assets/images/pokify-logo-final.png"

function NavBar({ loggedIn }) {
  const handleLogout = async () => {
    await axios
      .post("/api/log-out")
      .then((response) => {
        if (response.status === 200) {
          window.location.href = "/";
        } else {
          console.log("Logout failed:", response.statusText);
        }
      })
      .catch((err) => {
        console.log("" + err);
      });
  };

  return (
    <nav>
      <div className="nav-logo">
        <img className="pokify-logo" src={PokifyLogo} alt="pokify logo in blue and yellow"></img>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {loggedIn ? <button onClick={handleLogout}>Log Out</button> : null}
      </ul>
    </nav>
  );
}

export default NavBar;
