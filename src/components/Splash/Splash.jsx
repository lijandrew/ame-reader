import React from "react";

import "./Splash.scss";

export default class Splash extends React.Component {
  render() {
    return (
      <div className="Splash">
        <img src={require("../../assets/splash.gif")} alt="Welcome GIF" />
        <div className="Splash-text">drag 'n drop your .cbz</div>
        <div className="Splash-text-small">or use the Upload button</div>
      </div>
    );
  }
}
