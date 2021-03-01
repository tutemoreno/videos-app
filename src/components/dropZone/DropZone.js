import React, { Component } from 'react';

import axios from '../../myAxios';

import './DropZone.css';

function fileSize(size) {
  if (size === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default class DropZone extends Component {
  constructor() {
    super();
    this.state = {
      uploadedFiles: [],
    };
  }

  removeFile(i) {
    const files = this.state.uploadedFiles;
    files.splice(i, 1);
    this.setState({
      uploadedFiles: files,
    });
  }

  fileDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      this.setState({
        uploadedFiles: [...this.state.uploadedFiles, files[i]],
      });
    }
  }

  validateFile(file) {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
    ];
    if (validTypes.indexOf(file.type) === -1) return false;

    return true;
  }

  async uploadFiles() {
    for (let i = 0; i < this.state.uploadedFiles.length; i++) {
      const file = this.state.uploadedFiles[i],
        formData = new FormData();

      formData.append('file', file);

      try {
        const {
          data: { file },
        } = await axios({
          method: 'post',
          url: 'videos',
          data: formData,
        });

        if (file) this.props.addToContent(file);
      } catch (error) {
        console.log('[ERROR_UPLOADING]', error);
      }
    }

    this.props.closeModal();
  }

  render() {
    const { uploadedFiles } = this.state;
    return (
      <div>
        <div
          className="drop-container"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => this.fileDrop(e)}
        >
          <span>DragAndDrop</span>
        </div>
        <div className="file-display-container">
          {uploadedFiles.map((file, i) => (
            <div className="file-status-bar" key={i}>
              <span className="file-type">{file.type}</span>
              <span className="file-name">{file.name}</span>
              <span className="file-size">{fileSize(file.size)}</span>
              <button
                className="btn btn-red"
                onClick={(e) => this.removeFile(i)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <button className="btn btn-green" onClick={(e) => this.uploadFiles()}>
          Save
        </button>
      </div>
    );
  }
}
