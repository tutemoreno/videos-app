import React, { Component } from 'react';
import ReactPlayer from 'react-player';

export default class Player extends Component {
  render() {
    return (
      <div>
        <ReactPlayer
          url={`${process.env.REACT_APP_API}/videos/${this.props.fileId}`}
          controls
          playing
        />
      </div>
    );
  }
}
