import React from "react";

import "./SidebarUploader.scss";

export default class SidebarUploader extends React.Component {
  constructor(props) {
    super(props);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.pickerElem = null;
  }

  componentDidMount() {
    this.pickerElem = document.querySelector("input");
  }

  _______componentDidMount() {
    let dropper = document.querySelector(".dropper");

    let showDropper = function () {
      console.log("showFiledrop");
      dropper.style.visibility = "visible";
    };

    let hideDropper = function () {
      console.log("hideFiledrop");
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

  handleClick() {
    this.pickerElem.value = null;
  }

  render() {
    return (
      <div className="SidebarUploader">
        <div className="picker">
          <input
            onChange={this.onFileInputChange}
            type="file"
            onClick={this.handleClick}
            multiple
          />
        </div>
        <div className="dropper"></div>;
      </div>
    );
  }
}
