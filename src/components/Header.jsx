import React from 'react'

const Header = ({ changeUser, data }) => {
  const logOutUser = () => {
    localStorage.setItem('loggedInUser', '');
    changeUser('');
  }

  return (
    <div className='header-container'>
      <h1 className='header-greeting'>Hello <br /> <span className='header-name'>{data?.name || 'Admin'} 👋</span></h1>
      <button onClick={logOutUser} className='logout-button'>Log Out</button>
    </div>
  )
}

export default Header;
