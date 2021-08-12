import React from "react";

import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Viewer from "./components/Viewer/Viewer.jsx";

import "./App.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      viewerFile: null,
      zoom: 80,
      margin: 5,
    };

    this.addFiles = this.addFiles.bind(this);
    this.deleteFile = this.deleteFile.bind(this);

    this.setViewerFile = this.setViewerFile.bind(this);
    this.nextViewerFile = this.nextViewerFile.bind(this);
    this.prevViewerFile = this.prevViewerFile.bind(this);

    this.setZoom = this.setZoom.bind(this);
    this.setMargin = this.setMargin.bind(this);
    this.increaseZoom = this.increaseZoom.bind(this);
    this.decreaseZoom = this.decreaseZoom.bind(this);
    this.increaseMargin = this.increaseMargin.bind(this);
    this.decreaseMargin = this.decreaseMargin.bind(this);

    this.zoomConstant = 10;
    this.marginConstant = 10;
    this.maxZoom = 100;
    this.minZoom = 10;
    this.maxMargin = 100;
    this.minMargin = 0;

    // For Sidebar toggling to work even though Burger menu is child of Viewer for CSS reasons
    this.sidebarRef = React.createRef();
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  /**
   * Adds files to this.state.files
   * TODO: Deal with duplicates
   * @param {File[]} files Array of Files to be added to state variable
   * @param {Function} callback Callback function (used by SidebarUploader to call revealUploadedFile)
   */
  addFiles(files, callback) {
    this.setState(
      (state) => ({
        files: [...state.files, ...files],
      }),
      () => {
        if (callback) callback();
      }
    );
  }

  /**
   * Deletes passed File from the file list
   * @param {File} file File to be deleted from file list
   */
  deleteFile(file) {
    this.setState((state) => {
      let filesCopy = [...state.files];
      filesCopy.splice(filesCopy.indexOf(file), 1);
      return {
        files: filesCopy,
      };
    });
  }

  /**
   * Sets which file Viewer should display
   * Passed all the way down to SidebarFile to use in its onclick
   * @param {File} file The file to display in Viewer
   */
  setViewerFile(file) {
    this.setState({
      viewerFile: file,
    });
  }

  /**
   * Sets viewerFile to the next file in the array
   */
  nextViewerFile() {
    let currentIndex = this.state.files.indexOf(this.state.viewerFile);
    if (currentIndex === -1) {
      return;
    }
    if (currentIndex < this.state.files.length - 1) {
      this.setViewerFile(this.state.files[currentIndex + 1]);
    }
    // If out of bounds, do nothing
  }

  /**
   * Sets viewerFile to the previous file in the array
   */
  prevViewerFile() {
    let currentIndex = this.state.files.indexOf(this.state.viewerFile);
    if (currentIndex === -1) {
      return;
    }
    if (currentIndex > 0) {
      this.setViewerFile(this.state.files[currentIndex - 1]);
    }
    // If out of bounds, do nothing
  }

  setZoom(newZoom) {
    this.setState({
      zoom: newZoom,
    });
  }

  setMargin(newMargin) {
    this.setState({
      margin: newMargin,
    });
  }

  increaseZoom() {
    this.setZoom(Math.min(this.maxZoom, this.state.zoom + this.zoomConstant));
  }

  decreaseZoom() {
    console.log("decreaseZoom");
    this.setZoom(Math.max(this.minZoom, this.state.zoom - this.zoomConstant));
  }

  increaseMargin() {
    this.setMargin(
      Math.min(this.maxMargin, this.state.margin + this.marginConstant)
    );
  }

  decreaseMargin() {
    console.log("decreaseMargin");
    this.setMargin(
      Math.max(this.minMargin, this.state.margin - this.marginConstant)
    );
  }

  toggleSidebar() {
    this.sidebarRef.current.toggleSidebar();
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          ref={this.sidebarRef}
          files={this.state.files}
          addFiles={this.addFiles}
          deleteFile={this.deleteFile}
          setViewerFile={this.setViewerFile}
          viewerFile={this.state.viewerFile}
          // Props below for Toolbar child
          nextViewerFile={this.nextViewerFile}
          prevViewerFile={this.prevViewerFile}
          increaseMargin={this.increaseMargin}
          decreaseMargin={this.decreaseMargin}
          increaseZoom={this.increaseZoom}
          decreaseZoom={this.decreaseZoom}
          margin={this.state.margin}
          zoom={this.state.zoom}
          maxMargin={this.maxMargin}
          minMargin={this.minMargin}
          maxZoom={this.maxZoom}
          minZoom={this.minZoom}
        />
        <Viewer
          files={this.state.files}
          viewerFile={this.state.viewerFile}
          nextViewerFile={this.nextViewerFile}
          prevViewerFile={this.prevViewerFile}
          zoom={this.state.zoom}
          margin={this.state.margin}
          toggleSidebar={this.toggleSidebar}
        />
      </div>
    );
  }
}
