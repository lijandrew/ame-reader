import React from "react";

import SidebarFile from "../SidebarFile/SidebarFile.jsx";

import "./SidebarFilelist.scss";

export default class SidebarFilelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getFileElems = this.getFileElems.bind(this);
  }

  getFileElems() {
    let fileElems = [];
    for (let i = 0; i < this.props.files.length; i++) {
      fileElems.push(
        <SidebarFile
          file={this.props.files[i]}
          setViewerFile={this.props.setViewerFile}
          viewerFile={this.props.viewerFile}
          deleteFile={this.props.deleteFile}
          key={`file-${i}`}
        />
      );
    }
    return fileElems;
  }

  render() {
    return <div className="SidebarFilelist">{this.getFileElems()}</div>;
  }
}
