import React from "react";

import "./ViewerCanvas.scss";

export default class ViewerCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.getImageElems = this.getImageElems.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.imageUrls !== prevProps.imageUrls) {
      this.forceUpdate();
    }
  }

  /**
   * Creates and returns an array of <img> files with src attributes linked
   * @returns Array of <img>
   */
  getImageElems() {
    let imageElemArr = [];
    for (let i = 0; i < this.props.imageUrls.length; i++) {
      let imageUrl = this.props.imageUrls[i];
      imageElemArr.push(<img src={imageUrl} key={`image-${i}`} />);
    }
    return imageElemArr;
  }

  render() {
    return (
      <div className="ViewerCanvas">
        <div className="ViewerCanvas-image-wrapper">{this.getImageElems()}</div>;
      </div>
    );
  }
}
