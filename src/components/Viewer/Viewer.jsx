import React from "react";
const jszip = require("jszip");

import QuickNav from "../QuickNav/QuickNav.jsx";

import "./Viewer.scss";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [], // The image URLs directly used in <img> tags
    };
    this.revokeUrls = this.revokeUrls.bind(this);
    this.createUrls = this.createUrls.bind(this);
    this.processFile = this.processFile.bind(this);
    this.unzip = this.unzip.bind(this);
    this.getImageElems = this.getImageElems.bind(this);

    this.viewerRef = React.createRef();
  }

  componentDidMount() {
    this.revokeUrls(this.state.imageUrls);
    this.processFile(this.props.viewerFile);
    this.viewerRef.current.scrollTop = 0;
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewerFile !== prevProps.viewerFile) {
      this.revokeUrls(this.state.imageUrls);
      this.processFile(this.props.viewerFile);
    }
    if (
      this.props.zoom !== prevProps.zoom ||
      this.props.margin !== prevProps.margin
    ) {
      this.forceUpdate();
    }
  }

  /**
   * Processes the file for viewing and sets the state accordingly
   * Unzips the file, creates URLs for all entries, and sets the URLs into state
   * If file is falsy, will revoke all URLs and wipe this.state.imageUrls to force
   * a rerender of the welcome screen.
   * @param {File} file The file to process for viewing
   */
  processFile(file) {
    if (file) {
      this.unzip(this.props.viewerFile).then((blobs) => {
        let urls = this.createUrls(blobs);
        this.setState(
          {
            imageUrls: urls,
          },
          () => {
            // Wait until here to scroll to top to minimize the "flash"
            this.viewerRef.current.scrollTop = 0;
          }
        );
      });
    } else {
      this.revokeUrls(this.state.imageUrls);
      this.setState({
        imageUrls: [],
      });
    }
  }

  /**
   * Returns an array of Promises of Blobs of each zip entry
   * @param {File} zipFile The ZIP file to unzip
   * @returns {Promise} Promise of array of Blobs
   */
  unzip(zipFile) {
    return jszip.loadAsync(zipFile).then(function (zip) {
      let re = /(.jpg|.png|.gif|.ps|.jpeg)$/;
      let imageFilenames = Object.keys(zip.files).filter(function (filename) {
        // Ignore non-image files
        return re.test(filename.toLowerCase());
      });

      let blobPromises = [];
      for (let filename of imageFilenames) {
        let file = zip.files[filename];
        blobPromises.push(file.async("blob"));
      }
      return Promise.all(blobPromises);
    });
  }

  /**
   * Returns an array of object URLs for passed array of files
   * @param {File[]} files Array of files to create object URLs for
   */
  createUrls(files) {
    let urls = [];
    for (let file of files) {
      urls.push(URL.createObjectURL(file));
    }
    return urls;
  }

  /**
   * Revokes all URLs in the passed array, freeing memory
   * @param {DOMString[]} urls Array of DOMString URLs (of images, in this case)
   */
  revokeUrls(urls) {
    for (let url of urls) {
      URL.revokeObjectURL(url);
    }
  }

  /**
   * Creates and returns an array of <img> files with src attributes linked
   * @returns Array of <img>
   */
  getImageElems() {
    let imageElemArr = [];
    for (let i = 0; i < this.state.imageUrls.length; i++) {
      let imageUrl = this.state.imageUrls[i];
      imageElemArr.push(
        <img
          style={{
            margin: `${this.props.margin}px 0`,
          }}
          src={imageUrl}
          draggable="false"
          key={`image-${i}`}
        />
      );
    }
    return imageElemArr;
  }

  render() {
    return (
      <div ref={this.viewerRef} className="Viewer">
        {this.props.viewerFile ? (
          <QuickNav
            prevViewerFile={this.props.prevViewerFile}
            filename={this.props.viewerFile.name}
            nextViewerFile={this.props.nextViewerFile}
          />
        ) : (
          ""
        )}

        <div
          className="Viewer-image-wrapper"
          style={{
            width: `${this.props.zoom}%`,
          }}
        >
          {this.getImageElems()}
        </div>

        {this.props.viewerFile ? (
          <QuickNav
            prevViewerFile={this.props.prevViewerFile}
            filename={this.props.viewerFile.name}
            nextViewerFile={this.props.nextViewerFile}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
