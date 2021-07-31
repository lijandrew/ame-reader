import React from "react";

import "./SidebarFile.scss";

export default class SidebarFile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.elem = null;
  }

  componentDidMount() {
    this.elem = document.querySelector(".SidebarFile");
    this.elem.addEventListener("dragstart", this.handleDragStart);
    this.elem.addEventListener("dragend", this.handleDragEnd);
  }

  handleClick() {
    this.props.setViewerFile(this.props.file);
  }

  handleDelete(e) {
    e.stopPropagation();
    this.props.setViewerFile(); // Reset Viewer
    this.props.deleteFile(this.props.file);
  }

  handleDragStart(e) {
    this.elem.style.opacity = "0.4";
  }

  handleDragEnd(e) {
    this.elem.style.opacity = "1";
  }

  render() {
    return (
      <div className="SidebarFile" draggable="true" onClick={this.handleClick}>
        {this.props.file.name}
        <div className="SidebarFile-delete" onClick={this.handleDelete}>
          X
        </div>
      </div>
    );
  }
}
