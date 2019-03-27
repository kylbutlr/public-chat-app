import React from 'react';

export default ({ onSubmit, onChange, username, password, confirmPass, onClick }) => (
  <div>
  <form className='form' onSubmit={onSubmit}>
    <input
      type='text'
      name='username'
      id='registerUsername'
      className='input'
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
      className='input'
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
      className='input'
      placeholder='Confirm Password'
      autoComplete='off'
      required
      value={confirmPass}
      onChange={e => onChange('confirmPass', e)}
    />
    <br />
    <input className='button' type='submit' value='Register' />
  </form>
  <div className='or'>or</div>
  <button className='button' onClick={onClick}>Back to Login</button>
  </div>
);
