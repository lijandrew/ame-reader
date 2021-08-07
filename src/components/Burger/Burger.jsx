import React from "react";

import "./Burger.scss";

export default class Burger extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Burger" onClick={this.props.toggleSidebar}>
        <img className="Burger-svg" src={require("../../assets/burger.svg")} title="Toggle sidebar" alt="Hamburger menu icon" />
      </div>
    );
  }
}