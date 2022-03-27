import React from "react";
const jszip = require("jszip");

import QuickNav from "../QuickNav/QuickNav.jsx";

import "./Viewer.scss";

export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrls: [], // The image URLs directly used in <img> tags.
      isLoaded: false, // Show loading animation?
      error: false, // Show error?
    };
    this.viewerRef = React.createRef();
  }

  componentDidMount() {
    this.processFile(this.props.viewerFile);
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewerFile !== prevProps.viewerFile) {
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
   * @param {File} file The file to process for viewing.
   */
  processFile = (file) => {
    this.revokeUrls(this.state.imageUrls); // Always free memory first.
    if (file) {
      this.setState(
        {
          // Clear images, show loader, and hide error.
          imageUrls: [],
          isLoaded: false,
          error: false,
        },
        () => {
          // Process file (unzip, load image, or show error).
          const zipRe = /\.(cbz|cbr|zip|rar|7z|7zip)$/gi;
          const imageRe = /\.(jpe?g|png|gif)$/gi;
          if (zipRe.test(file.name)) {
            // Display using zip file.
            this.unzip(this.props.viewerFile).then((blobs) => {
              this.setState(
                {
                  imageUrls: this.createUrls(blobs),
                  isLoaded: true,
                },
                () => {
                  this.viewerRef.current.scrollTop = 0;
                }
              );
            });
          } else if (imageRe.test(file.name)) {
            // Display single image.
            this.setState(
              {
                imageUrls: this.createUrls([file]),
                isLoaded: true,
              },
              () => {
                this.viewerRef.current.scrollTop = 0;
              }
            );
          } else {
            // Display error.
            this.setState({
              isLoaded: true,
              error: true,
            });
          }
        }
      );
    } else {
      // No file selected. Clear images, hide loader, hide error.
      this.setState({
        imageUrls: [],
        isLoaded: true,
        error: false,
      });
    }
  };

  /**
   * Returns an array of Promises of Blobs of each zip entry
   * @param {File} zipFile The ZIP file to unzip
   * @returns {Promise} Promise of array of Blobs
   */
  unzip = (zipFile) => {
    return jszip.loadAsync(zipFile).then(function (zip) {
      let re = /\.(jpe?g|png|gif)$/i;
      let imageFilenames = Object.keys(zip.files).filter(function (filename) {
        // Ignore non-image files
        return re.test(filename.toLowerCase());
      }).sort((a, b) => a.localeCompare(b));

      let blobPromises = [];
      for (let filename of imageFilenames) {
        let file = zip.files[filename];
        blobPromises.push(file.async("blob"));
      }
      return Promise.all(blobPromises);
    });
  };

  /**
   * Returns an array of object URLs for passed array of files
   * @param {File[]} files Array of files to create object URLs for
   */
  createUrls = (files) => {
    let urls = [];
    for (let file of files) {
      urls.push(URL.createObjectURL(file));
    }
    return urls;
  };

  /**
   * Revokes all URLs in the passed array, freeing memory
   * @param {DOMString[]} urls Array of DOMString URLs (of images, in this case)
   */
  revokeUrls = (urls) => {
    for (let url of urls) {
      URL.revokeObjectURL(url);
    }
  };

  /**
   * Creates and returns an array of <img> files with src attributes linked
   * @returns Array of <img>
   */
  getImageElems = () => {
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
  };

  render() {
    return (
      <div ref={this.viewerRef} className="Viewer">
        {this.props.viewerFile && this.state.isLoaded ? (
          <QuickNav
            files={this.props.files}
            viewerFile={this.props.viewerFile}
            prevViewerFile={this.props.prevViewerFile}
            filename={this.props.viewerFile.name}
            nextViewerFile={this.props.nextViewerFile}
          />
        ) : (
          ""
        )}

        {this.state.isLoaded ? (
          ""
        ) : (
          <div className="Viewer-loading">
            <img src={require("../../assets/loading.gif")} alt="Loading GIF" draggable="false" />
          </div>
        )}

        {this.props.viewerFile ? (
          ""
        ) : (
          <div className="Viewer-splash">
            <img src={require("../../assets/splash.gif")} alt="Welcome GIF" draggable="false" />
            <div className="Viewer-splash-text">
              drag 'n drop your .cbz files
            </div>
            <div className="Viewer-splash-text-small">
              or use the Upload button
            </div>
          </div>
        )}

        {this.state.error ? (
          <div className="Viewer-error">
            <img src={require("../../assets/error.jpg")} alt="Error image" draggable="false" />
            <div className="Viewer-error-text">Could not load this file.</div>
            <div className="Viewer-error-text-small">
              Are you using an unsupported file extension?
            </div>
          </div>
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

        {this.props.viewerFile && this.state.isLoaded ? (
          <QuickNav
            files={this.props.files}
            viewerFile={this.props.viewerFile}
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
