import React from 'react';

export default function LoginForm({ activeTab, tabs, onSubmit, onChange, username, password }) {
  return (
    <div
      className='LoginForm login-form'
      id='LoginForm'
      style={{
        display: activeTab === tabs.LOGIN ? 'block' : 'none',
      }}>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='username'
          id='loginUsername'
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
          id='loginPassword'
          className='input'
          placeholder='Password'
          autoComplete='off'
          required
          value={password}
          onChange={e => onChange('password', e)}
        />
        <br />
        <input className='button' type='submit' value='Login' />
      </form>
    </div>
  );
}
