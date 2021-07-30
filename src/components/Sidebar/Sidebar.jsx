import React from "react";

import "./Sidebar.scss";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.getFileNameDivArr = this.getFileNameDivArr.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileNameArr !== prevProps.fileNameArr) {
      this.forceUpdate();
    }
  }

  onFileInputChange(event) {
    if (event.target.files && event.target.files[0]) {
      for (let file of event.target.files) {
        this.props.addFile(file);
      }
    }
  }

  getFileNameDivArr() {
    this.props.fileNameArr;
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-file-list"></div>

        <div className="sidebar-uploader">
          <input
            onChange={this.onFileInputChange}
            type="file"
            name="inputFile"
            id="inputFile"
            multiple
          />
        </div>
      </div>
    );
  }
}
