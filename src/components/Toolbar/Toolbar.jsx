import React from "react";

import "./Toolbar.scss";

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Toolbar">
        <div onClick={this.props.decreaseMargin}>
          <img
            src={require("../../assets/shrink.svg")}
            title="Decrease margin"
            alt="Shrinking arrows"
          />
        </div>
        <div onClick={this.props.increaseMargin}>
          <img
            src={require("../../assets/expand.svg")}
            title="Increase margin"
            alt="Expanding arrows"
          />
        </div>
        <div onClick={this.props.decreaseZoom}>
          <img
            src={require("../../assets/zoom-out.svg")}
            title="Zoom out"
            alt="Magnifying glass zoom out"
          />
        </div>
        <div onClick={this.props.increaseZoom}>
          <img
            src={require("../../assets/zoom-in.svg")}
            title="Zoom in"
            alt="Magnifying glass zoom in"
          />
        </div>
        <div onClick={this.props.prevViewerFile}>
          <img
            src={require("../../assets/arrow-left.svg")}
            title="Previous file"
            alt="Left arrow"
          />
        </div>
        <div onClick={this.props.nextViewerFile}>
          <img
            src={require("../../assets/arrow-right.svg")}
            title="Next file"
            alt="Right arrow"
          />
        </div>
      </div>
    );
  }
}
