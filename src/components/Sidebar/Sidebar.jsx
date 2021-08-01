import React from "react";
import SidebarFilelist from "../SidebarFilelist/SidebarFilelist";
import SidebarUploader from "../SidebarUploader/SidebarUploader";

import "./Sidebar.scss";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Sidebar">
        <SidebarUploader addFiles={this.props.addFiles} />
        <SidebarFilelist
          files={this.props.files}
          viewerFile={this.props.viewerFile}
          setViewerFile={this.props.setViewerFile}
          deleteFile={this.props.deleteFile}
        />
      </div>
    );
  }
}
