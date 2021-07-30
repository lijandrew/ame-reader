import React from "react";

import "./Viewer.scss";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [],
    };
    this.revokeImageUrls = this.revokeImageUrls.bind(this);
    this.getImageUrls = this.getImageUrls.bind(this);
    this.getImageElems = this.getImageElems.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.images !== prevProps.images) {
      this.revokeImageUrls(); // Clean up previous urls
      this.getImageUrls();
    }
  }

  revokeImageUrls() {
    for (let imageUrl of this.state.imageUrls) {
      URL.revokeObjectURL(imageUrl);
    }
  }

  getImageUrls() {
    let imageUrls = [];
    for (let image of this.props.images) {
      imageUrls.push(URL.createObjectURL(image));
    }
    this.setState({
      imageUrls: imageUrls,
    });
  }

  /**
   * Creates and returns an array of <img> files with src attributes linked
   * @returns Array of <img>
   */
  getImageElems() {
    let imageElemArr = [];
    for (let i = 0; i < this.state.imageUrls.length; i++) {
      let imageUrl = this.state.imageUrls[i];
      imageElemArr.push(<img src={imageUrl} key={`image-${i}`} />);
    }
    return imageElemArr;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return (
      <div className="viewer">
        <div className="viewer-img-wrapper">{this.getImageElems()}</div>
      </div>
    );
  }
}
