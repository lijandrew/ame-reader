import React from "react";

import "./Toolbar.scss";

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Toolbar">
        <button onClick={this.props.nextViewerFile}>Next</button>
        <button onClick={this.props.prevViewerFile}>Previous</button>
        <button onClick={this.props.increaseZoom}>Zoom In</button>
        <button onClick={this.props.decreaseZoom}>Zoom Out</button>
        <button onClick={this.props.increaseMargin}>Increase Margin</button>
        <button onClick={this.props.decreaseMargin}>Decrease Margin</button>
      </div>
    );
  }
}
