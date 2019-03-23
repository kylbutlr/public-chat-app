import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const API_ENDPOINT = 'https://kylbutlr-chat-api.herokuapp.com';
const tabs = {
  LOGIN: 1,
  REGISTER: 2,
  MAIN: 3,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoginInputChange = this.handleLoginInputChange.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleRegisterInputChange = this.handleRegisterInputChange.bind(this);
    this.handleRegisterUser = this.handleRegisterUser.bind(this);
    this.tabClick = this.tabClick.bind(this);
    this.resetLoginInput = this.resetLoginInput.bind(this);
    this.resetRegisterInput = this.resetRegisterInput.bind(this);
    this.state = {
      activeTab: tabs.MAIN,
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
        this.setState({ loggedIn: savedSession }, () => {
          this.tabClick(tabs.MAIN);
        });
      }
    }
    this.getUsers(() => {
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
      this.tabClick(tabs.LOGIN);
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
            this.tabClick(tabs.MAIN);
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
    if (this.state.activeTab === tabs.LOGIN && activeTab === tabs.REGISTER) {
      this.resetLoginInput();
    }
    if (this.state.activeTab === tabs.REGISTER && activeTab === tabs.LOGIN) {
      this.resetRegisterInput();
    }
    if (activeTab === tabs.MAIN) {
      document.getElementById('LoginForm').classList.remove('reveal');
      document.getElementById('RegisterForm').classList.remove('reveal');
      if (this.state.loggedIn !== false) {
        document.getElementById('postInput').focus();
      };
      setTimeout(() => {
        this.setState({ activeTab })
      }, 250);
    } else {
      this.setState({ activeTab }, () => {
        if (activeTab === tabs.LOGIN) {
          document.getElementById('loginUsername').focus();
        }
        if (activeTab === tabs.REGISTER) {
          document.getElementById('registerUsername').focus();
        }
        document.getElementById('LoginForm').classList.add('reveal');
        document.getElementById('RegisterForm').classList.add('reveal');
      });
    }
  }

  capitalizeFirstChar(string) {
    if (string) {
      const newString = string.substring(0, 1).toUpperCase() + string.substring(1);
      return newString;
    } else {
      return string;
    }
  }

  resetLoginInput() {
    this.setState({
      loginInput: {
        username: '',
        password: '',
      },
    });
  }

  resetRegisterInput() {
    this.setState({
      registerInput: {
        username: '',
        password: '',
        confirmPass: '',
      },
    });
  }

  renderPost(data) {
    const { id, text, user_id } = data;
    const username = this.state.users.filter(x => x.id === user_id)[0].username;
    return (
      <li key={id}>
        <div className={this.state.loggedIn.username === username ? 'current-user' : ''}>
          <p className='message-username'>{this.capitalizeFirstChar(username)}:</p>
          <p className='message-text'>{text}</p>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className='App'>
        <div className='Header'>
          <div
            style={{
              display:
                this.state.activeTab === tabs.MAIN && this.state.loggedIn === false
                  ? 'block'
                  : 'none',
            }}>
            <button onClick={() => this.tabClick(tabs.LOGIN)}>Login</button>
          </div>
          <div
            style={{
              display:
                this.state.activeTab === tabs.MAIN && this.state.loggedIn !== false
                  ? 'block'
                  : 'none',
            }}>
            <button onClick={() => this.handleLogout()}>Logout</button>
          </div>
          <div
            style={{
              display:
                this.state.activeTab !== tabs.MAIN && this.state.loggedIn === false
                  ? 'block'
                  : 'none',
            }}>
            <button onClick={() => this.tabClick(tabs.MAIN)}>Hide Login</button>
          </div>
          <div
            className='LoginForm'
            id='LoginForm'
            style={{
              display: this.state.activeTab === tabs.LOGIN ? 'block' : 'none',
            }}>
            <LoginForm
              onSubmit={this.handleLoginUser}
              onChange={this.handleLoginInputChange}
              onClick={() => this.tabClick(tabs.REGISTER)}
              {...this.state.loginInput}
            />
          </div>
          <div
            className='RegisterForm'
            id='RegisterForm'
            style={{
              display: this.state.activeTab === tabs.REGISTER ? 'block' : 'none',
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
          <div className='postMessage'>
            <form onSubmit={e => this.handleCreatePost(e)}>
              <input
                type='text'
                name='text'
                id='postInput'
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
