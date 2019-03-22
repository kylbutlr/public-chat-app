import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const API_ENDPOINT = 'https://kylbutlr-chat-api.herokuapp.com';
const tabs = {
  LOGIN: 1,
  REGISTER: 2,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoginInputChange = this.handleLoginInputChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleRegisterInputChange = this.handleRegisterInputChange.bind(this);
    this.handleRegisterUser = this.handleRegisterUser.bind(this);
    this.tabClick = this.tabClick.bind(this);
    this.state = {
      activeTab: tabs.LOGIN,
      loggedIn: false,
      users: [],
      posts: [],
      postInput: '',
      loginInput: {
        username: '',
        password: '',
      },
      registerInput: {
        username: '',
        password: '',
        confirmPass: '',
      },
    };
  }

  componentDidMount() {
    this.getSavedSession();
  }

  getSavedSession() {
    const savedSession = JSON.parse(window.localStorage.getItem('savedSession'));
    if (savedSession) {
      if (savedSession.jwt !== '') {
        this.setState({ loggedIn: savedSession });
      }
    }
    this.getUsers(cb => {
      this.getPosts();
    });
  }

  getUsers(cb) {
    axios
      .get(`${API_ENDPOINT}/users`)
      .catch(err => {
        console.log(err);
      })
      .then(users => {
        this.setState(
          {
            users: users.data,
          },
          () => {
            cb();
          }
        );
      });
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
    setTimeout(() => {
      this.getPosts();
      document.getElementById('list').classList.add('refresh');
      document.getElementById('list').classList.remove('refresh');
    }, 2500);
  }

  getConfig(cb) {
    cb({
      headers: {
        authorization: this.state.loggedIn.jwt,
      },
    });
  }

  handleLoginInputChange(field, e) {
    this.setState({ loginInput: { ...this.state.loginInput, [field]: e.target.value } });
  }

  handleRegisterInputChange(field, e) {
    this.setState({ registerInput: { ...this.state.registerInput, [field]: e.target.value } });
  }

  handleCreatePost(e) {
    e.preventDefault();
    if (this.state.loggedIn === false) {
      alert('Please log in first');
      this.setState({ postInput: '' });
      document.getElementById('loginUsername').focus();
    } else {
      const text = this.state.postInput;
      const user_id = this.state.loggedIn.user_id;
      const created = new Date();
      const newPost = { text, created, user_id };
      this.getConfig(config => {
        axios
          .post(`${API_ENDPOINT}/posts`, newPost, config)
          .catch(err => {
            console.log(err);
          })
          .then(data => {
            this.setState({
              postInput: '',
              posts: this.state.posts.concat(data.data),
            });
          });
      });
    }
  }

  handleRegisterUser(e) {
    e.preventDefault();
    if (this.state.registerInput.password === this.state.registerInput.confirmPass) {
      const newUser = {
        username: this.state.registerInput.username.toLowerCase(),
        password: this.state.registerInput.password,
      };
      axios
        .post(`${API_ENDPOINT}/register`, newUser)
        .catch(err => {
          if (err.response.status === 422) {
            alert(
              'Sorry, that username (' + this.state.registerInput.username + ') already exists.'
            );
          } else {
            alert('Error: ' + err.message);
          }
        })
        .then(res => {
          if (res) {
            this.setState({
              users: this.state.users.concat(res.data),
              registerInput: {
                username: '',
                password: '',
                confirmPass: '',
              },
            });
            this.tabClick(tabs.LOGIN);
            document.getElementById('loginUsername').focus();
          }
        });
    } else {
      alert('Sorry, passwords did not match. Please try again.');
    }
  }

  handleLoginUser(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.loginInput.username.toLowerCase(),
      password: this.state.loginInput.password,
    };
    axios
      .post(`${API_ENDPOINT}/login`, newUser)
      .catch(err => {
        if (err) {
          if (err.response.status === 404) {
            alert('Sorry, invalid username/password, please try again.');
          } else {
            alert('Error: ' + err.message);
          }
        }
      })
      .then(user => {
        if (user) {
          this.setState({ loggedIn: user.data }, () => {
            window.localStorage.setItem('savedSession', JSON.stringify(user.data));
            document.getElementById('postText').focus();
          });
        }
      });
  }

  handleLogout() {
    if (window.confirm('Are you sure you want to logout?')) {
      this.tabClick(tabs.LOGIN);
      this.setState({
        loggedIn: false,
      });
      const localStorage = JSON.parse(window.localStorage.getItem('savedSession'));
      localStorage.jwt = '';
      window.localStorage.setItem('savedSession', JSON.stringify(localStorage));
    }
  }

  tabClick(activeTab) {
    this.setState({ activeTab });
  }

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
    const username = this.state.users.filter(x => x.id === user_id)[0].username;
    return (
      <li key={id}>
        <div>
          <p>
            {this.capitalizeFirstChar(username)}: {text}
          </p>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className='App'>
        <div className='Login'>
          <div
            style={{
              display: this.state.loggedIn !== false ? 'block' : 'none',
            }}>
            <button onClick={() => this.handleLogout()}>Logout</button>
          </div>
          <div
            style={{
              display:
                this.state.loggedIn === false && this.state.activeTab === tabs.LOGIN
                  ? 'block'
                  : 'none',
            }}>
            <LoginForm
              onSubmit={this.handleLoginUser}
              onChange={this.handleLoginInputChange}
              onClick={() => this.tabClick(tabs.REGISTER)}
              {...this.state.loginInput}
            />
          </div>
          <div
            style={{
              display:
                this.state.loggedIn === false && this.state.activeTab === tabs.REGISTER
                  ? 'block'
                  : 'none',
            }}>
            <RegisterForm
              onSubmit={this.handleRegisterUser}
              onChange={this.handleRegisterInputChange}
              onClick={() => this.tabClick(tabs.LOGIN)}
              {...this.state.registerInput}
            />
          </div>
        </div>
        <div className='Body'>
          <div id='list' className='list'>
            <ol>{this.state.posts.map(n => this.renderPost(n))}</ol>
          </div>
          <div>
            <form onSubmit={e => this.handleCreatePost(e)}>
              <input
                type='text'
                name='text'
                id='postText'
                placeholder='New Message'
                autoComplete='off'
                required
                value={this.state.postInput}
                onChange={e => this.setState({ postInput: e.target.value })}
              />
              <input type='submit' value='Send' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
