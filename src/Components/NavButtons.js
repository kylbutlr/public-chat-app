import React from 'react';

export default function NavButtons({ activeTab, tabs, loggedIn, tabClick, handleLogoutUser }) {
  return (
    <div className='nav-buttons'>
      <button
        style={{
          display:
            (activeTab === tabs.MAIN && loggedIn === false) ||
            (activeTab === tabs.REGISTER && loggedIn === false)
              ? 'block'
              : 'none',
        }}
        className='button login-logout'
        onClick={() => tabClick(tabs.LOGIN)}>
        Login
      </button>
      <button
        style={{
          display: activeTab === tabs.LOGIN && loggedIn === false ? 'block' : 'none',
        }}
        className='button login-logout'
        onClick={() => tabClick(tabs.MAIN)}>
        Cancel
      </button>
      <button
        style={{
          display:
            (activeTab === tabs.MAIN && loggedIn === false) ||
            (activeTab === tabs.LOGIN && loggedIn === false)
              ? 'block'
              : 'none',
        }}
        className='button login-logout'
        onClick={() => tabClick(tabs.REGISTER)}>
        Register
      </button>
      <button
        style={{
          display: activeTab === tabs.REGISTER && loggedIn === false ? 'block' : 'none',
        }}
        className='button login-logout'
        onClick={() => tabClick(tabs.MAIN)}>
        Cancel
      </button>
      <button
        style={{
          display: loggedIn !== false ? 'block' : 'none',
        }}
        className='button login-logout'
        onClick={() => handleLogoutUser()}>
        Logout
      </button>
    </div>
  );
}
