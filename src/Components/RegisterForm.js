import React from 'react';

export default function RegisterForm({
  activeTab,
  tabs,
  onSubmit,
  onChange,
  username,
  password,
  confirmPass,
}) {
  return (
    <div
      className='RegisterForm register-form'
      id='RegisterForm'
      style={{
        display: activeTab === tabs.REGISTER ? 'block' : 'none',
      }}>
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
        <input className='button' type='submit' value='Register' />
      </form>
    </div>
  );
}
