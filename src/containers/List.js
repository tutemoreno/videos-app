import React, { Component } from 'react';

import axios from '../myAxios';

import './List.css';

import Card from '../components/card/Card';
import Modal from '../components/modal/Modal';
import DropZone from '../components/dropZone/DropZone';
import Player from '../components/player/Player';

function isEmpty(str) {
  return !str || 0 === str.length;
}

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: [],
      search: '',
      modalContext: { show: false, modalBody: null },
    };
  }

  async componentDidMount() {
    this.refresh();
  }

  async refresh() {
    const query = {
        method: 'get',
        url: 'videos',
      },
      search = this.state.search;

    if (!isEmpty(search)) query.params = { search };

    try {
      const response = await axios(query);

      this.setState({ data: response.data.files, loading: false });
    } catch (error) {
      if (error) console.log(error);
    }
  }

  async deleteFile(i) {
    const files = this.state.data,
      file = files.splice(i, 1)[0];

    try {
      const response = await axios({
        method: 'delete',
        url: `videos/${file._id}`,
      });

      if (response.data.file) this.setState({ uploadedFiles: files });
    } catch (error) {
      if (error) console.log(error);
    }
  }

  closeModal() {
    this.setState({
      modalContext: { show: false, body: null },
    });
  }

  addToContent(file) {
    const files = this.state.data;

    files.push(file);

    this.setState({
      data: files,
    });
  }

  openUpload() {
    this.setState({
      modalContext: {
        show: true,
        body: (
          <DropZone
            closeModal={() => this.closeModal()}
            addToContent={(file) => this.addToContent(file)}
          />
        ),
        title: 'Uploader',
      },
    });
  }

  openPlayer(file) {
    this.setState({
      modalContext: {
        show: true,
        body: <Player fileId={file._id} />,
        title: file.name,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.refresh();
  }

  render() {
    const { data, loading, modalContext } = this.state;

    if (loading) return <h1>Loading...</h1>;

    return (
      <div className="list">
        <div className="list-header">
          <h1>My video library</h1>
        </div>
        <hr />
        <div className="list-body">
          <form className="list-form" onSubmit={(e) => this.handleSubmit(e)}>
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              autoFocus
              onChange={(e) => this.setState({ search: e.target.value })}
            ></input>
            <button
              type="button"
              className="btn"
              onClick={() => this.openUpload()}
            >
              Upload
            </button>
          </form>
          <div className="list-content">
            {data.map((file, i) => (
              <Card
                file={file}
                key={file._id}
                openPlayer={() => this.openPlayer(file)}
                deleteFile={() => this.deleteFile(i)}
              />
            ))}
          </div>
        </div>
        <Modal
          title={modalContext.title}
          onClose={() => this.closeModal()}
          show={modalContext.show}
        >
          {modalContext.body}
        </Modal>
      </div>
    );
  }
}
