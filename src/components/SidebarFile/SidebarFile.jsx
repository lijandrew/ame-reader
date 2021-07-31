import React from "react";

import "./SidebarFile.scss";

export default class SidebarFile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setViewerFile(this.props.file);
  }

  render() {
    return (
      <div className="SidebarFile" onClick={this.handleClick}>
        {this.props.file.name}
      </div>
    );
  }
}
