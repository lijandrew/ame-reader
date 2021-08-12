import React from "react";

import "./SidebarFile.scss";

export default class SidebarFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleAuxClick = this.handleAuxClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.elemRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewerFile !== prevProps.viewerFile) {
      if (this.props.viewerFile === this.props.file) {
        this.setState({
          active: true,
        });
      } else {
        this.setState({
          active: false,
        });
      }
    }
  }

  handleClick(e) {
    this.props.setViewerFile(this.props.file);
  }

  handleAuxClick(e) {
    if (e.button === 1) {
      this.handleDelete(e);
    }
  }

  handleDelete(e) {
    e.stopPropagation();
    this.props.setViewerFile(); // Reset Viewer by calling without giving a File
    this.props.deleteFile(this.props.file);
  }

  render() {
    return (
      <div
        className={`SidebarFile${this.state.active ? " active" : ""}`}
        onClick={this.handleClick}
        onAuxClick={this.handleAuxClick}
      >
        {this.props.file.name}
        <div className="delete" onClick={this.handleDelete}>
          <img src={require("../../assets/x.svg")} draggable="false" />
        </div>
      </div>
    );
  }
}
