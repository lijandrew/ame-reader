import React from "react";
const zip = require("@zip.js/zip.js");

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
    if (this.props.viewerFile !== prevProps.viewerFile) {
      this.revokeImageUrls();
      this.setState({
        imageUrls: [URL.createObjectURL(this.props.viewerFile)], // Temporarily just a 1-element array
      });
    }

    /*
    if (this.props.images !== prevProps.images) {
      this.revokeImageUrls(); // Clean up previous urls
      this.getImageUrls();
    }
    */
  }

  async unzip() {
    // create a BlobReader to read with a ZipReader the zip from a Blob object
    const reader = new zip.ZipReader(new zip.BlobReader(this.props.viewerFile));

    // get all entries from the zip
    const entries = await reader.getEntries();
    if (entries.length) {
      // get first entry content as text by using a TextWriter
      const text = await entries[0].getData(
        // writer
        new zip.TextWriter(),
        // options
        {
          onprogress: (index, max) => {
            // onprogress callback
          },
        }
      );
      // text contains the entry data as a String
      console.log(text);
    }

    // close the ZipReader
    await reader.close();
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

  render() {
    return (
      <div className="viewer">
        <div className="viewer-img-wrapper">{this.getImageElems()}</div>
      </div>
    );
  }
}
