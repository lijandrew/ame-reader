import React from "react";
import SidebarFilelist from "../SidebarFilelist/SidebarFilelist";
import SidebarUploader from "../SidebarUploader/SidebarUploader";
import Toolbar from "../Toolbar/Toolbar.jsx";
import Burger from "../Burger/Burger.jsx";

import "./Sidebar.scss";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState((state) => ({
      hidden: !state.hidden,
    }));
  }

  render() {
    return (
      <div className="Sidebar">
        <Burger toggleSidebar={this.toggleSidebar} />
        <div className={`Sidebar-content${this.state.hidden ? " hidden" : ""}`}>
          <SidebarUploader addFiles={this.props.addFiles} />
          <Toolbar
            nextViewerFile={this.props.nextViewerFile}
            prevViewerFile={this.props.prevViewerFile}
            increaseMargin={this.props.increaseMargin}
            decreaseMargin={this.props.decreaseMargin}
            increaseZoom={this.props.increaseZoom}
            decreaseZoom={this.props.decreaseZoom}
          />
          <SidebarFilelist
            files={this.props.files}
            viewerFile={this.props.viewerFile}
            setViewerFile={this.props.setViewerFile}
            deleteFile={this.props.deleteFile}
          />
        </div>
      </div>
    );
  }
}
