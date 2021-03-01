import React, { Component } from 'react';
import './Card.css';

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s;
}

export default class Card extends Component {
  render() {
    const { file, openPlayer, deleteFile } = this.props;

    return (
      <div className="card">
        <div className="card-header">
          <img
            className="video-thumb"
            src={`${process.env.REACT_APP_API}/videos/${this.props.file._id}/thumb`}
            alt={'_File_not_found'}
            onClick={(e) => openPlayer()}
          ></img>
          <span className="duration-label">
            {fmtMSS(Math.floor(file.duration))}
          </span>
          <button className="btn btn-red btn-delete" onClick={deleteFile}>
            X
          </button>
        </div>
        <div className="card-body">
          <div className="file-title">
            <h3>{file.name}</h3>
          </div>
          <div className="file-info">
            <span className="row">
              <span className="label">Video codec</span>
              <span className="value">{file.videoCodec}</span>
            </span>
            <span className="row">
              <span className="label">Audio codec</span>
              <span className="value">{file.audioCodec}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
