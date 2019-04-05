import React, { Component } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class Navbar extends Component {
  render() {
    return (
      <div className='Header'>
        <div className='nav-buttons'>
          <button
            style={{
              display:
              (this.props.activeTab === this.props.tabs.MAIN && this.props.loggedIn === false) ||
              (this.props.activeTab === this.props.tabs.REGISTER && this.props.loggedIn === false)
                  ? 'block'
                  : 'none',
            }}
            className='button login-logout'
            onClick={() => this.props.tabClick(this.props.tabs.LOGIN)}>
            Login
          </button>
          <button
            style={{
              display:
                this.props.activeTab === this.props.tabs.LOGIN && this.props.loggedIn === false
                  ? 'block'
                  : 'none',
            }}
            className='button login-logout'
            onClick={() => this.props.tabClick(this.props.tabs.MAIN)}>
            Cancel
          </button>
          <button
            style={{
              display:
                (this.props.activeTab === this.props.tabs.MAIN && this.props.loggedIn === false) ||
                (this.props.activeTab === this.props.tabs.LOGIN && this.props.loggedIn === false)
                  ? 'block'
                  : 'none',
            }}
            className='button login-logout'
            onClick={() => this.props.tabClick(this.props.tabs.REGISTER)}>
            Register
          </button>
          <button
            style={{
              display:
                this.props.activeTab === this.props.tabs.REGISTER && this.props.loggedIn === false
                  ? 'block'
                  : 'none',
            }}
            className='button login-logout'
            onClick={() => this.props.tabClick(this.props.tabs.MAIN)}>
            Cancel
          </button>
          <button
            style={{
              display:
                this.props.loggedIn !== false
                  ? 'block'
                  : 'none',
            }}
            className='button login-logout'
            onClick={() => this.props.handleLogoutUser()}>
            Logout
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
