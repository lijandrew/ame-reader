import React from "react";

import SidebarFile from "../SidebarFile/SidebarFile.jsx";

import "./SidebarFilelist.scss";

export default class SidebarFilelist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.getFileElems = this.getFileElems.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.newFiles !== prevProps.newFiles) {
      this.addFiles(this.props.newFiles);
    }
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

  getFileElems() {
    let fileElems = [];
    for (let i = 0; i < this.state.files.length; i++) {
      fileElems.push(
        <SidebarFile
          file={this.state.files[i]}
          setViewerFile={this.props.setViewerFile}
          deleteFile={this.deleteFile}
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
