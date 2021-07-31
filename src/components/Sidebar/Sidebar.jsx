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
    this.setNewFiles = this.setNewFiles.bind(this);
  }

  /**
   * Sets newFiles in state, which sends them to SidebarUploader
   * @param {File[]} newFiles Array of Files to be added to SidebarFilelist
   */
  setNewFiles(newFiles) {
    this.setState({
      newFiles: newFiles,
    });
  }

  render() {
    return (
      <div className="Sidebar">
        <SidebarUploader setNewFiles={this.setNewFiles} />
        <SidebarFilelist
          newFiles={this.state.newFiles}
          setViewerFile={this.props.setViewerFile}
        />
      </div>
    );
  }
}
