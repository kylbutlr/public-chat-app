import React, { Component } from 'react';

export default class RegisterForm extends Component {
  render() {
    return (
      <div className='register-form'>
        <form className='form' onSubmit={this.props.onSubmit}>
          <input
            type='text'
            name='username'
            id='registerUsername'
            className='input'
            placeholder='Username'
            autoComplete='off'
            required
            value={this.props.username}
            onChange={e => this.props.onChange('username', e)}
          />
          <br />
          <input
            type='password'
            name='password'
            id='registerPassword'
            className='input'
            placeholder='Password'
            autoComplete='off'
            required
            value={this.props.password}
            onChange={e => this.props.onChange('password', e)}
          />
          <br />
          <input
            type='password'
            name='confirmPass'
            id='registerConfirmPass'
            className='input'
            placeholder='Confirm Password'
            autoComplete='off'
            required
            value={this.props.confirmPass}
            onChange={e => this.props.onChange('confirmPass', e)}
          />
          <br />
          <input className='button' type='submit' value='Register' />
        </form>
        <div className='or'>or</div>
        <button className='button' onClick={this.props.onClick}>
          Back to Login
        </button>
      </div>
    );
  }
}
