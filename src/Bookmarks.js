/*global chrome*/
import React, { Component } from 'react';
import {DebounceInput} from 'react-debounce-input';

class Bookmarks extends Component {
  constructor(props) {
    super(props);

    this.state = { keyword: '', bookmarks: props.bookmarks };

    this.handleClick = this.handleClick.bind(this);
    this.handleAllRemove = this.handleAllRemove.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const keyword = this.state.keyword;
    const newBookmarks = search(keyword, nextProps.bookmarks);
    this.setState({ bookmarks: newBookmarks });
  }

  handleClick(e) {
    e.preventDefault();
    chrome.tabs.create({url: e.target.href});
  }

  handleAllRemove() {
    this.props.removeAll();
  }

  handleRemove(bookmark) {
    this.props.remove(bookmark);
  }

  handleSearch(event) {
    const keyword = event.target.value.trim();
    const newBookmarks = search(keyword, this.props.bookmarks);
    this.setState({ keyword, bookmarks: newBookmarks });
  }

  render() {
    const headingStyle = {
      display: 'inline',
      marginBottom: 0,
      marginRight: '10px'
    };
    const bookmarkListStyle = { marginTop: '20px', marginLeft: '20px' };
    const searchFieldStyle = { marginTop: '10px' };
    const clearButtonStyle = {
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '2px',
    };
    const linkStyle = {
      width: '90%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'inline-block',
      textAlign: 'left',
    };

    const deleteIconStyle = { verticalAlign: 'middle' };

    return (
      <div style={bookmarkListStyle}>
        <h1 className="title is-6" style={headingStyle}>Bookmark List</h1>
        <span className="button is-danger" style={clearButtonStyle} onClick={this.handleAllRemove}>
          All Clear
        </span>

        <div className="field">
          <div className="control">
            <DebounceInput
              type="text"
              minLength={1}
              debounceTimeout={300}
              onChange={this.handleSearch}
              style={searchFieldStyle}
              className="input is-small is-rounded"
              placeholder="Search"
            />
          </div>
        </div>

        {this.state.bookmarks.map((item) =>
          <div>
            <a
              className="button is-text is-small is-fullwidth"
              style={linkStyle}
              href={item.url}
              onClick={this.handleClick}
            >
              {item.title}
            </a>
            <span
              className="delete is-small"
              style={deleteIconStyle}
              onClick={() => this.handleRemove(item)}
            ></span>
          </div>
        )}
      </div>
    );
  }
}

function search(keyword, list) {
  if (keyword.length === 0) { return list; }
  return list.filter((item => item.title.indexOf(keyword) > -1));
}

export default Bookmarks;
