import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {
  render() {
    const { title, children, onClose, show } = this.props;

    return (
      <div
        className={`modal-container ${show ? 'show' : ''}`}
        onClick={onClose}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  }
}
