import React from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Viewer from "./components/Viewer/Viewer.jsx";

import "./App.scss";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerFile: null,
    };
    this.setViewerFile = this.setViewerFile.bind(this);
  }

  /**
   * Sets which file Viewer should display
   * Passed all the way down to SidebarFile to use in its onclick
   * @param {File} file The file to display in Viewer
   */
  setViewerFile(file) {
    console.log("setViewerFile called with: ");
    console.log(file);
    this.setState({
      viewerFile: file,
    }, () => {
      console.log("state now");
      console.log(this.state);
    });
  }

  render() {
    return (
      <div className="app">
        <Sidebar setViewerFile={this.setViewerFile} />
        <Viewer viewerFile={this.state.viewerFile} />
      </div>
    );
  }
}
