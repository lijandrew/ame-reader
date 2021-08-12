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
      isVisible: true,
    };
    this.revealUploadedFiles = this.revealUploadedFiles.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.sidebarFilelistRef = React.createRef();
    this.toolbarRef = React.createRef();
    this.sidebarUploaderRef = React.createRef();
  }

  componentDidMount() {
    // let toolbarHeight = this.toolbarRef.current.
  }

  /**
   * Opens Sidebar and scrolls Filelist down to bottom to show newly-uploaded files.
   */
  revealUploadedFiles() {
    this.setState(
      {
        isVisible: true,
      },
      () => {
        this.sidebarFilelistRef.current.scrollToBottom();
      }
    );
  }

  toggleSidebar() {
    this.setState((state) => ({
      isVisible: !state.isVisible,
    }));
  }

  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar-Burger-wrapper">
          <Burger toggleSidebar={this.toggleSidebar} />
        </div>
        <div
          className={`Sidebar-content${this.state.isVisible ? "" : " hidden"}`}
        >
          <SidebarUploader
            ref={this.sidebarUploaderRef}
            addFiles={this.props.addFiles}
            revealUploadedFiles={this.revealUploadedFiles}
          />
          <Toolbar
            ref={this.toolbarRef}
            files={this.props.files}
            viewerFile={this.props.viewerFile}
            nextViewerFile={this.props.nextViewerFile}
            prevViewerFile={this.props.prevViewerFile}
            increaseMargin={this.props.increaseMargin}
            decreaseMargin={this.props.decreaseMargin}
            increaseZoom={this.props.increaseZoom}
            decreaseZoom={this.props.decreaseZoom}
            margin={this.props.margin}
            zoom={this.props.zoom}
            maxMargin={this.props.maxMargin}
            minMargin={this.props.minMargin}
            maxZoom={this.props.maxZoom}
            minZoom={this.props.minZoom}
          />
          <SidebarFilelist
            ref={this.sidebarFilelistRef}
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
