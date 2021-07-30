import React from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Viewer from "./components/Viewer/Viewer.jsx";

import "./App.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      // openedFile: null,
    };
    this.getFilenames = this.getFilenames.bind(this);
    this.clearFiles = this.clearFiles.bind(this);
    this.addFile = this.addFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.openFile = this.openFile.bind(this);
  }

  getFilenames() {
    return this.state.files.map((file) => file.name);
  }

  clearFiles() {
    this.setState({
      files: [],
    });
  }

  addFile(file) {
    this.setState((prevState) => {
      return {
        files: [...prevState.files, file],
        // openedFile: [...prevState.files, file][0], // TEMPORARY
      };
    });
  }

  removeFile() {
    // TODO
  }

  openFile(file) {
    this.setState({
      openedFile: file,
    });
  }

  render() {
    return (
      <div className="app">
        <Sidebar
          filenames={this.getFilenames()}
          addFile={this.addFile}
          clearFiles={this.clearFiles}
          removeFile={this.removeFile}
        />
        <Viewer images={this.state.files} />
      </div>
    );
  }
}
