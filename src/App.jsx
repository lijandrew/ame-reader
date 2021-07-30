import React from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Viewer from "./components/Viewer/Viewer.jsx";

import "./App.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      openedFile: null,
    };
    this.getFileNameArr = this.getFileNameArr.bind(this);
    this.addFile = this.addFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.openFile = this.openFile.bind(this);
  }

  getFileNameArr() {
    return this.state.files.map((file) => file.name);
  }

  addFile(file) {
    this.setState((prevState) => {
      return {
        files: [...prevState.files, file],
        openedFile: file, // TEMPORARY
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
    console.log("App.jsx render called. The state now is:");
    console.log(this.state);
    return (
      <div className="app">
        <Sidebar
          fileNameArr={this.getFileNameArr()}
          addFile={this.addFile}
          removeFile={this.removeFile}
        />
        <Viewer openedFile={this.state.openedFile} />
      </div>
    );
  }
}
