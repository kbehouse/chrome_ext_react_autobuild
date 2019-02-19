/*global chrome*/
import React, { Component } from 'react';
import AddBookmarkForm from './AddBookmarkForm';
import Bookmarks from './Bookmarks';

// chrome.extension.getBackgroundPage().console.log('foo');
// var bkg = chrome.extension.getBackgroundPage();

// bkg.console.log('bkg log init OK');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
    };

    this.addBookmark = this.addBookmark.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.remove = this.remove.bind(this);

    console.log('init OK');
  }

  componentWillMount() {
    chrome.storage.sync.get(['tmpBookmarks'], (result) => {
      const bookmarks = result.tmpBookmarks;
      if (bookmarks && bookmarks.length > 0) {
        this.setState({ bookmarks });
      }
    });
  }

  addBookmark(title, url) {
    const bookmarks = this.state.bookmarks;
    const newBookmarks = [...bookmarks, { title, url }];
    chrome.storage.sync.set({ tmpBookmarks: newBookmarks }, () => {
      this.setState({ bookmarks: newBookmarks });
    });
  }

  removeAll() {
    chrome.storage.sync.clear();
    this.setState({ bookmarks: [] });
  }

  remove(bookmark) {
    const newBookmarks = this.state.bookmarks;
    const index = newBookmarks.findIndex(x => x.url === bookmark.url);
    if (index >= 0) {
      newBookmarks.splice(index, 1);
      chrome.storage.sync.set({ tmpBookmarks: newBookmarks }, () => {
        this.setState({ bookmarks: newBookmarks });
      });
    }
  }

  render() {
    const bookmarks = this.state.bookmarks;
    console.log('bookmarks -> ' + bookmarks);
    return (
      <div className="container">
        <AddBookmarkForm bookmarks={bookmarks} addBookmark={this.addBookmark} />
        <Bookmarks bookmarks={bookmarks} remove={this.remove} removeAll={this.removeAll} />
      </div>
    );
  }
}

export default App;
