import React from "react";

import "./Sidebar.scss";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.getFileNameElemArr = this.getFileNameElems.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.fileNameArr !== prevProps.fileNameArr) {
      this.forceUpdate();
    }
  }

  onFileInputChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.props.clearFiles();
      for (let file of event.target.files) {
        this.props.addFile(file);
      }
    }
  }

  getFileNameElems() {
    let fileNameElemArr = [];
    for (let i = 0; i < this.props.filenames.length; i++) {
      let fileName = this.props.filenames[i];
      fileNameElemArr.push(<div key={`filename-${i}`}>{fileName}</div>);
    }
    return fileNameElemArr;
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-file-list">{this.getFileNameElems()}</div>
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
