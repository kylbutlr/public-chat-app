import React, { Component } from 'react';
import axios from 'axios';
import '../node_modules/bulma/css/bulma.min.css';
import './App.css';
import Navbar from './Components/Navbar';
import Body from './Components/Body';

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
    this.handleLogoutUser = this.handleLogoutUser.bind(this);
    this.handlePostInputChange = this.handlePostInputChange.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
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
    this.runResize();
    this.getSavedSession();
  }

  runResize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
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

  handlePostInputChange(e) {
    this.setState({ postInput: e.target.value });
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
            this.resetLoginInput();
          });
        }
      });
  }

  handleLogoutUser() {
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

  handleDeletePost(e) {
    const postId = e.target.id;
    this.getConfig(config => {
      axios
        .delete(`${API_ENDPOINT}/posts/${postId}`, config)
        .catch(err => {
          console.log(err);
        })
        .then(() => {
          this.setState({
            posts: this.state.posts.filter(x => x.id !== Number(postId)),
          });
        });
    });
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
      }
      setTimeout(() => {
        this.setState({ activeTab });
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

  resetLoginInput() {
    this.setState({
      loginInput: {
        username: '',
        password: '',
      },
    })
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

  render() {
    return (
      <div className='App'>
        <Navbar
          tabs={tabs}
          activeTab={this.state.activeTab}
          loggedIn={this.state.loggedIn}
          tabClick={this.tabClick}
          handleLoginUser={this.handleLoginUser}
          handleLogoutUser={this.handleLogoutUser}
          handleLoginInputChange={this.handleLoginInputChange}
          handleRegisterUser={this.handleRegisterUser}
          handleRegisterInputChange={this.handleRegisterInputChange}
          loginInput={this.state.loginInput}
          registerInput={this.state.registerInput}
        />
        <Body
          posts={this.state.posts}
          users={this.state.users}
          loggedIn={this.state.loggedIn}
          handleCreatePost={this.handleCreatePost}
          handleDeletePost={this.handleDeletePost}
          handlePostInputChange={this.handlePostInputChange}
        />
      </div>
    );
  }
}

export default App;
