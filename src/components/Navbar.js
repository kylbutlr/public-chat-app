import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class Navbar extends Component {
  handleLogout() {
    if (window.confirm('Are you sure you want to logout?')) {
      this.props.tabClick(this.props.tabs.LOGIN);
      this.setState({
        loggedIn: false,
      });
      const localStorage = JSON.parse(window.localStorage.getItem('savedSession'));
      localStorage.jwt = '';
      window.localStorage.setItem('savedSession', JSON.stringify(localStorage));
    }
  }

  render() {
    return (
      <div className='Header'>
        <div
          style={{
            display:
              this.props.activeTab === this.props.tabs.MAIN && this.props.loggedIn === false
                ? 'block'
                : 'none',
          }}>
          <button
            className='button login-logout'
            onClick={() => this.props.tabClick(this.props.tabs.LOGIN)}>
            Login
          </button>
        </div>
        <div
          style={{
            display:
              this.props.activeTab === this.props.tabs.MAIN && this.props.loggedIn !== false
                ? 'block'
                : 'none',
          }}>
          <button className='button login-logout' onClick={() => this.handleLogout()}>
            Logout
          </button>
        </div>
        <div
          style={{
            display:
              this.props.activeTab !== this.props.tabs.MAIN && this.props.loggedIn === false
                ? 'block'
                : 'none',
          }}>
          <button
            className='button login-logout'
            onClick={() => this.props.tabClick(this.props.tabs.MAIN)}>
            Cancel
          </button>
        </div>
        <div
          className='LoginForm'
          id='LoginForm'
          style={{
            display: this.props.activeTab === this.props.tabs.LOGIN ? 'block' : 'none',
          }}>
          <LoginForm
            onSubmit={this.props.handleLoginUser}
            onChange={this.props.handleLoginInputChange}
            onClick={() => this.props.tabClick(this.props.tabs.REGISTER)}
            {...this.props.loginInput}
          />
        </div>
        <div
          className='RegisterForm'
          id='RegisterForm'
          style={{
            display: this.props.activeTab === this.props.tabs.REGISTER ? 'block' : 'none',
          }}>
          <RegisterForm
            onSubmit={this.props.handleRegisterUser}
            onChange={this.props.handleRegisterInputChange}
            onClick={() => this.props.tabClick(this.props.tabs.LOGIN)}
            {...this.props.registerInput}
          />
        </div>
      </div>
    );
  }
}
