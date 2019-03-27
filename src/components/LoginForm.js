import React from 'react';

export default ({ onSubmit, onChange, username, password, onClick }) => (
  <div>
  <form onSubmit={onSubmit}>
    <input
      type='text'
      name='username'
      id='loginUsername'
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
      id='loginPassword'
      placeholder='Password'
      autoComplete='off'
      required
      value={password}
      onChange={e => onChange('password', e)}
    />
    <br />
    <input type='submit' value='Login' />
  </form>
  <div className='or'>or</div>
  <button onClick={onClick}>Register</button>
  </div>
);
