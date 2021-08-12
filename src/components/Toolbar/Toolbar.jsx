import React from "react";

import "./Toolbar.scss";

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.canDecreaseMargin = this.canDecreaseMargin.bind(this);
    this.canIncreaseMargin = this.canIncreaseMargin.bind(this);
    this.canDecreaseZoom = this.canDecreaseZoom.bind(this);
    this.canIncreaseZoom = this.canIncreaseZoom.bind(this);
    this.canPrevViewerFile = this.canPrevViewerFile.bind(this);
    this.canNextViewerFile = this.canNextViewerFile.bind(this);
  }

  canDecreaseMargin() {
    return this.props.viewerFile && this.props.margin > this.props.minMargin;
  }

  canIncreaseMargin() {
    return this.props.viewerFile && this.props.margin < this.props.maxMargin;
  }

  canDecreaseZoom() {
    return this.props.viewerFile && this.props.zoom > this.props.minZoom;
  }

  canIncreaseZoom() {
    return this.props.viewerFile && this.props.zoom < this.props.maxZoom;
  }

  canPrevViewerFile() {
    return (
      this.props.viewerFile &&
      this.props.files.indexOf(this.props.viewerFile) !== 0
    );
  }

  canNextViewerFile() {
    return (
      this.props.viewerFile &&
      this.props.files.indexOf(this.props.viewerFile) !==
        this.props.files.length - 1
    );
  }

  render() {
    return (
      <div className="Toolbar">
        <div
          className={`svg-button${this.canDecreaseMargin() ? "" : " disabled"}`}
          onClick={this.props.decreaseMargin}
        >
          <img
            src={require("../../assets/shrink.svg")}
            title="Decrease margin"
            alt="Shrinking arrows"
            draggable="false"
          />
        </div>

        <div
          className={`svg-button${this.canIncreaseMargin() ? "" : " disabled"}`}
          onClick={this.props.increaseMargin}
        >
          <img
            src={require("../../assets/expand.svg")}
            title="Increase margin"
            alt="Expanding arrows"
            draggable="false"
          />
        </div>

        <div
          className={`svg-button${this.canDecreaseZoom() ? "" : " disabled"}`}
          onClick={this.props.decreaseZoom}
        >
          <img
            src={require("../../assets/zoom-out.svg")}
            title="Zoom out"
            alt="Magnifying glass zoom out"
            draggable="false"
          />
        </div>

        <div
          className={`svg-button${this.canIncreaseZoom() ? "" : " disabled"}`}
          onClick={this.props.increaseZoom}
        >
          <img
            src={require("../../assets/zoom-in.svg")}
            title="Zoom in"
            alt="Magnifying glass zoom in"
            draggable="false"
          />
        </div>

        <div
          className={`svg-button${this.canPrevViewerFile() ? "" : " disabled"}`}
          onClick={this.props.prevViewerFile}
        >
          <img
            src={require("../../assets/arrow-left.svg")}
            title="Previous file"
            alt="Left arrow"
            draggable="false"
          />
        </div>

        <div
          className={`svg-button${this.canNextViewerFile() ? "" : " disabled"}`}
          onClick={this.props.nextViewerFile}
        >
          <img
            src={require("../../assets/arrow-right.svg")}
            title="Next file"
            alt="Right arrow"
            draggable="false"
          />
        </div>
      </div>
    );
  }
}
