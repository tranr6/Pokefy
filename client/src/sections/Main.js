import React from "react";
import { Routes, Route } from "react-router-dom";
import ArtistTypes from "./ArtistTypes.js";
import About from "./About.js";
import "../style/styles.css"

export default class Main extends React.Component {
  render() {
    const token = this.props;

    return (
      <main>
        <Routes>
          <Route exact path="/" element={<ArtistTypes token={token} />}></Route>
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    );
  }
}
