import React from "react";

import "./QuickNav.scss";

export default class QuickNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="QuickNav">
        <div className="svg-button" onClick={this.props.prevViewerFile}>
          <img
            src={require("../../assets/arrow-left.svg")}
            title="Previous file"
            alt="Left arrow"
          />
        </div>

        <div>{this.props.filename.split(".")[0]}</div>

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
