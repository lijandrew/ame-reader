import React from "react";

import "./SidebarUploader.scss";

export default class SidebarUploader extends React.Component {
  constructor(props) {
    super(props);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.handlePickerInputClick = this.handlePickerInputClick.bind(this);
    this.handlePickerButtonClick = this.handlePickerButtonClick.bind(this);
    this.pickerInput = null;
    this.pickerButton = null;
  }

  componentDidMount() {
    this.pickerInput = document.querySelector(".picker input");
    this.pickerButton = document.querySelector(".picker-button");
  }

  onFileInputChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.props.addFiles(event.target.files);
    }
  }

  handlePickerInputClick() {
    this.pickerInput.value = null;
  }

  handlePickerButtonClick() {
    this.pickerInput.click();
  }

  render() {
    return (
      <div className="SidebarUploader">
        <div className="picker">
          <input
            onChange={this.onFileInputChange}
            type="file"
            onClick={this.handlePickerInputClick}
            accept=".cbz,.zip,.rar,.7z"
            multiple
          />
          <div className="picker-button" onClick={this.handlePickerButtonClick}>
            <span>Upload .CBZ</span>
          </div>
        </div>
      </div>
    );
  }
}
