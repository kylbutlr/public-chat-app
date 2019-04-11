import React, { Component } from 'react';

export default class Body extends Component {
  capitalizeFirstChar(string) {
    if (string) {
      const newString = string.substring(0, 1).toUpperCase() + string.substring(1);
      return newString;
    } else {
      return string;
    }
  }

  renderPost(data) {
    const { id, text, user_id } = data;
    const username = this.props.users.filter(x => x.id === user_id)[0].username;
    return (
      <li key={id}>
        <div
          className={
            this.props.loggedIn.username === username ? 'message current-user' : 'message'
          }>
          <div className='message-content'>
            <p className='message-username'>{this.capitalizeFirstChar(username)}:</p>
            <p className='message-text'>{text}</p>
          </div>
          <div
            className='delete-message'
            style={{
              display: this.props.loggedIn.username === username ? 'block' : 'none',
            }}>
            <button className='button' id={id} onClick={e => this.props.handleDeletePost(e)}>
              X
            </button>
          </div>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className='Body'>
        <div id='list' className='list'>
          <ol>{this.props.posts.map(n => this.renderPost(n))}</ol>
        </div>
        <div className='postMessage'>
          <form onSubmit={e => this.props.handleCreatePost(e)}>
            <input
              type='text'
              name='text'
              id='postInput'
              className='input postInput'
              placeholder='New Message'
              autoComplete='off'
              required
              value={this.props.postInput}
              onChange={this.props.handlePostInputChange}
            />
            <input className='button postButton' type='submit' value='Send' />
          </form>
        </div>
      </div>
    );
  }
}
