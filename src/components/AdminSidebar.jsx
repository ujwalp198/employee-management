import React from 'react';

const AdminSidebar = ({ changeUser }) => {
  return (
    <div className='admin-sidebar'>
      <div className='sidebar-header'>
        <h2>Admin Console</h2>
      </div>
      <ul className='sidebar-menu'>
        <li className='sidebar-item active'>Task Manager</li>
        <li className='sidebar-item'>Employees</li>
        <li className='sidebar-item'>Analytics</li>
        <li className='sidebar-item'>Settings</li>
      </ul>
      <div className='sidebar-footer'>
        <button className='sidebar-logout' onClick={changeUser}>Log Out</button>
      </div>
    </div>
  );
};

export default AdminSidebar;
