import React from "react";

import "./SidebarFile.scss";

export default class SidebarFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleClick = this.handleClick.bind(this);
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
      <div
        className={`SidebarFile${this.state.active ? " active" : ""}`}
        onClick={this.handleClick}
      >
        {this.props.file.name}
        <div className="SidebarFile-delete" onClick={this.handleDelete}>
          X
        </div>
      </div>
    );
  }
}
