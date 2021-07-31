import React from "react";
import SidebarFilelist from "../SidebarFilelist/SidebarFilelist";
import SidebarUploader from "../SidebarUploader/SidebarUploader";

import "./Sidebar.scss";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFiles: [], // Purely for SidebarUploader to send new files to SidebarFilelist
    };
    this.addFiles = this.addFiles.bind(this);
    this.sidebarFilelistRef = React.createRef();
  }

  /**
   * Calls child component SidebarFilelist's addFiles(files)
   * @param {File[]} files Array of Files to be added to SidebarFilelist
   */
  addFiles(files) {
    console.log("addFiles");
    this.sidebarFilelistRef.current.addFiles(files);
  }

  render() {
    return (
      <div className="Sidebar">
        <SidebarUploader addFiles={this.addFiles} />
        <SidebarFilelist
          setViewerFile={this.props.setViewerFile}
          ref={this.sidebarFilelistRef}
        />
      </div>
    );
  }
}
