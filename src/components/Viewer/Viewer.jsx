import React from "react";
import ViewerCanvas from "../ViewerCanvas/ViewerCanvas.jsx";
import ViewerToolbar from "../ViewerToolbar/ViewerToolbar.jsx";

const jszip = require("jszip");

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
  }

  componentDidMount() {
    this.revokeUrls(this.state.imageUrls);
    this.processFile(this.props.viewerFile);
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewerFile !== prevProps.viewerFile) {
      this.revokeUrls(this.state.imageUrls);
      this.processFile(this.props.viewerFile);
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
        this.setState({
          imageUrls: urls,
        });
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

  render() {
    return (
      <div className="Viewer">
        <ViewerToolbar />
        <ViewerCanvas imageUrls={this.state.imageUrls} />
      </div>
    );
  }
}
