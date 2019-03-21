import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API_ENDPOINT = 'http://localhost:3000';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      posts: [],
      postInput: {
        text: '',
        time: '',
        date: '',
      },
      loginInput: {
        username: '',
        password: '',
      },
      registerInput: {
        username: '',
        password: '',
        confirmPass: '',
      }
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios
      .get(`${API_ENDPOINT}/posts`)
      .catch(err => {
        console.log(err);
      })
      .then(posts => {
        this.setState({
          posts: posts.data,
        });
      });
  }

  handleInputChange(field, e) {
    this.setState({ input: { ...this.state.input, [field]: e.target.value } });
  }

  handleLoginInputChange(field, e) {
    this.setState({ loginInput: { ...this.state.loginInput, [field]: e.target.value } });
  }

  handleRegisterInputChange(field, e) {
    this.setState({ registerInput: { ...this.state.registerInput, [field]: e.target.value } });
  }

  renderPost(data) {
    const { id, text, time, date, user_id } = data;
    return (
      <li key={id}>
        <div>
          <p>User_ID: {user_id}</p>
          <p>Text: {text}</p>
          <p>Time: {time || 'n/a'} | Date: {date || 'n/a'}</p>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className="App">
        <ol>{this.state.posts.map(n => this.renderPost(n))}</ol>
      </div>
    );
  }
}

export default App;
