import React from "react";

import "./QuickNav.scss";

export default class QuickNav extends React.Component {
  constructor(props) {
    super(props);

    this.canPrevViewerFile = this.canPrevViewerFile.bind(this);
    this.canNextViewerFile = this.canNextViewerFile.bind(this);
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
      <div className="QuickNav">
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

        <div>{this.props.filename.split(".")[0]}</div>

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
