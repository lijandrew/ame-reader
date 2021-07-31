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
    this.setState((prevState) => ({
      files: [...prevState.files, ...files],
    }));
  }

  getFileElems() {
    let fileElems = [];
    for (let i = 0; i < this.state.files.length; i++) {
      fileElems.push(
        <SidebarFile
          file={this.state.files[i]}
          setViewerFile={this.props.setViewerFile}
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
