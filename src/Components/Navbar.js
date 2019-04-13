import React from 'react';
import NavButtons from './NavButtons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Navbar({
  activeTab,
  tabs,
  loggedIn,
  tabClick,
  handleLogoutUser,
  loginInput,
  handleLoginInputChange,
  handleLoginUser,
  registerInput,
  handleRegisterInputChange,
  handleRegisterUser,
}) {
  return (
    <div className='Header'>
      <NavButtons
        activeTab={activeTab}
        tabs={tabs}
        loggedIn={loggedIn}
        tabClick={tabClick}
        handleLogoutUser={handleLogoutUser}
      />
      <LoginForm
        onSubmit={handleLoginUser}
        onChange={handleLoginInputChange}
        onClick={() => tabClick(tabs.REGISTER)}
        activeTab={activeTab}
        tabs={tabs}
        {...loginInput}
      />
      <RegisterForm
        onSubmit={handleRegisterUser}
        onChange={handleRegisterInputChange}
        onClick={() => tabClick(tabs.LOGIN)}
        activeTab={activeTab}
        tabs={tabs}
        {...registerInput}
      />
    </div>
  );
}
