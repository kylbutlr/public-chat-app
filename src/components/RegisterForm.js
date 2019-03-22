import React from 'react';

export default ({ onSubmit, onChange, username, password, confirmPass, onClick }) => (
  <div>
  <form onSubmit={onSubmit}>
    <input
      type='text'
      name='username'
      id='registerUsername'
      placeholder='Username'
      autoComplete='off'
      required
      value={username}
      onChange={e => onChange('username', e)}
    />
    <br />
    <input
      type='password'
      name='password'
      id='registerPassword'
      placeholder='Password'
      autoComplete='off'
      required
      value={password}
      onChange={e => onChange('password', e)}
    />
    <br />
    <input
      type='password'
      name='confirmPass'
      id='registerConfirmPass'
      placeholder='Confirm Password'
      autoComplete='off'
      required
      value={confirmPass}
      onChange={e => onChange('confirmPass', e)}
    />
    <br />
    <input type='submit' value='Register' />
  </form>
  <button onClick={onClick}>Back to Login</button>
  </div>
);
