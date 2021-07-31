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
    };
    this.addFiles = this.addFiles.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.setViewerFile = this.setViewerFile.bind(this);
  }

  /**
   * Adds files to this.state.files
   * TODO: Deal with duplicates
   * @param {File[]} files Array of Files to be added to state variable
   */
  addFiles(files) {
    this.setState((state) => ({
      files: [...state.files, ...files],
    }));
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

  render() {
    return (
      <div className="app">
        <Sidebar
          files={this.state.files}
          addFiles={this.addFiles}
          deleteFile={this.deleteFile}
          setViewerFile={this.setViewerFile}
        />
        <Viewer files={this.state.files} viewerFile={this.state.viewerFile} />
      </div>
    );
  }
}
