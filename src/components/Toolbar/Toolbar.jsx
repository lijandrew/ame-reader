import React from "react";

import "./Toolbar.scss";

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Toolbar">
        <div className="svg-button" onClick={this.props.decreaseMargin}>
          <img
            src={require("../../assets/shrink.svg")}
            title="Decrease margin"
            alt="Shrinking arrows"
          />
        </div>
        <div className="svg-button" onClick={this.props.increaseMargin}>
          <img
            src={require("../../assets/expand.svg")}
            title="Increase margin"
            alt="Expanding arrows"
          />
        </div>
        <div className="svg-button" onClick={this.props.decreaseZoom}>
          <img
            src={require("../../assets/zoom-out.svg")}
            title="Zoom out"
            alt="Magnifying glass zoom out"
          />
        </div>
        <div className="svg-button" onClick={this.props.increaseZoom}>
          <img
            src={require("../../assets/zoom-in.svg")}
            title="Zoom in"
            alt="Magnifying glass zoom in"
          />
        </div>
        <div className="svg-button" onClick={this.props.prevViewerFile}>
          <img
            src={require("../../assets/arrow-left.svg")}
            title="Previous file"
            alt="Left arrow"
          />
        </div>
        <div className="svg-button" onClick={this.props.nextViewerFile}>
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
