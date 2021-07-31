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

  _______componentDidMount() {
    let dropper = document.querySelector(".dropper");

    let showDropper = function () {
      dropper.style.visibility = "visible";
    };

    let hideDropper = function () {
      dropper.style.visibility = "hidden";
    };

    let allowDrag = function (e) {
      if (true) {
        // Test that the item being dragged is a valid one
        e.dataTransfer.dropEffect = "copy";
        e.preventDefault();
      }
    };

    let handleDrop = function (e) {
      e.preventDefault();
      hideDropper();
      alert("Drop!");
    };

    window.addEventListener("dragenter", function (e) {
      showDropper();
    });

    dropper.addEventListener("dragenter", allowDrag);

    dropper.addEventListener("dragover", allowDrag);

    dropper.addEventListener("dragleave", function (e) {
      hideDropper();
    });

    dropper.addEventListener("drop", handleDrop);
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
            multiple
          />
          <div className="picker-button" onClick={this.handlePickerButtonClick}>
            <span>Upload .cbz</span>
          </div>
        </div>
        <div className="dropper"></div>;
      </div>
    );
  }
}
