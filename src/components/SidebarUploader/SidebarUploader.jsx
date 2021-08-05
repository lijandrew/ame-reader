import React from "react";

import "./SidebarUploader.scss";

export default class SidebarUploader extends React.Component {
  constructor(props) {
    super(props);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handlePickerInputClick = this.handlePickerInputClick.bind(this);
    this.handlePickerButtonClick = this.handlePickerButtonClick.bind(this);
    this.pickerInput = null;
    this.pickerButton = null;

    this.pickerInputRef = React.createRef();
    this.pickerButtonRef = React.createRef();
    this.dropperRef = React.createRef();
    this.pickerInput = null;
    this.pickerButton = null;
    this.dropper = null;
  }

  componentDidMount() {
    this.pickerInput = this.pickerInputRef.current;
    this.pickerButton = this.pickerButtonRef.current;

    // Set up drag-n-drop file upload
    let dropper = this.dropperRef.current;

    let showDropper = () => {
      dropper.style.visibility = "visible";
    };

    let hideDropper = () => {
      dropper.style.visibility = "hidden";
    };

    let allowDrag = (e) => {
      if (true) {
        // Test that the item being dragged is a valid one
        e.dataTransfer.dropEffect = "copy";
        e.preventDefault();
      }
    };

    let handleDrop = (e) => {
      e.preventDefault();
      hideDropper();
      this.uploadFiles(e.dataTransfer.files);
    };

    // Show dropper when dragged into anywhere in the window
    window.addEventListener("dragenter", function (e) {
      showDropper();
    });

    // Constantly preventDefault to allow drag to continue occurring
    dropper.addEventListener("dragenter", allowDrag);
    dropper.addEventListener("dragover", allowDrag);

    // Hide the dropper upon leaving the dropper area
    dropper.addEventListener("dragleave", function (e) {
      hideDropper();
    });

    // Handle the drop
    dropper.addEventListener("drop", handleDrop);
  }

  handleFileInputChange(event) {
    if (event.target.files && event.target.files[0]) {
      this.uploadFiles(event.target.files);
    }
  }

  /**
   * Sorts files by name, then calls this.props.addFiles on them
   * @param {File[]} files Files to add
   */
  uploadFiles(files) {
    files = Array.from(files); // In case files passed in was directly from event object
    files.sort((a, b) => (a.name > b.name ? 1 : -1)); // Sort by filename
    this.props.addFiles(files);
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
            ref={this.pickerInputRef}
            onChange={this.handleFileInputChange}
            type="file"
            onClick={this.handlePickerInputClick}
            accept=".cbz,.zip,.rar,.7z,.7zip"
            multiple
          />
          <div
            ref={this.pickerButtonRef}
            className="picker-button"
            onClick={this.handlePickerButtonClick}
          >
            <span>Upload .CBZ</span>
          </div>

          <div className="dropper" ref={this.dropperRef}></div>
        </div>
      </div>
    );
  }
}
