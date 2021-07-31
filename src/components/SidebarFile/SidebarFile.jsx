import React from "react";

import "./SidebarFile.scss";

export default class SidebarFile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    this.props.setViewerFile(this.props.file);
  }

  handleDelete(e) {
    e.stopPropagation();
    this.props.setViewerFile(); // Reset Viewer
    this.props.deleteFile(this.props.file);
  }

  render() {
    return (
      <div className="SidebarFile" onClick={this.handleClick}>
        {this.props.file.name}
        <div className="SidebarFile-delete" onClick={this.handleDelete}>
          x
        </div>
      </div>
    );
  }
}
