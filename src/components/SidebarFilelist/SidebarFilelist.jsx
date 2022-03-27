import React from "react";

import SidebarFile from "../SidebarFile/SidebarFile.jsx";

import "./SidebarFilelist.scss";

export default class SidebarFilelist extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarFilelistRef = React.createRef();
  }

  scrollToBottom = () => {
    console.log("scrollToBottom called");
    this.sidebarFilelistRef.current.scrollTop =
      this.sidebarFilelistRef.current.scrollHeight;
  };

  getFileElems = () => {
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
  };

  render() {
    return (
      <div className="SidebarFilelist" ref={this.sidebarFilelistRef}>
        {this.getFileElems()}
      </div>
    );
  }
}
