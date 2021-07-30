import React from "react";

import "./Viewer.scss";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.getImgElemArr = this.getImgElemArr.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.openedFile !== prevProps.openedFile) {
      this.forceUpdate();
    }
  }

  /**
   * Processes images, extracts their URLs, and returns them as an array of <img>
   * @returns Array of <img>
   */
  getImgElemArr() {
    let imgElemArr = [];
    if (this.props.openedFile) {
      let imgSrcArr = [URL.createObjectURL(this.props.openedFile)];
      for (let i = 0; i < imgSrcArr.length; i++) {
        let imgSrc = imgSrcArr[i];
        imgElemArr.push(<img src={imgSrc} key={i} />);
      }
    }
    return imgElemArr;
  }

  render() {
    console.log("viewer render called");
    return (
      <div className="viewer">
        <div className="viewer-img-wrapper">{this.getImgElemArr()}</div>
      </div>
    );
  }
}
