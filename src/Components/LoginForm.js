import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <div className='login-form'>
        <form className='form' onSubmit={this.props.onSubmit}>
          <input
            type='text'
            name='username'
            id='loginUsername'
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
            id='loginPassword'
            className='input'
            placeholder='Password'
            autoComplete='off'
            required
            value={this.props.password}
            onChange={e => this.props.onChange('password', e)}
          />
          <br />
          <input className='button' type='submit' value='Login' />
        </form>
      </div>
    );
  }
}
