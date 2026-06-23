import React from 'react';

const AdminSidebar = ({ changeUser, activeTab, setActiveTab }) => {
  return (
    <div className='admin-sidebar'>
      <div className='sidebar-header'>
        <h2>Admin Console</h2>
      </div>
      <ul className='sidebar-menu'>
        <li className={`sidebar-item ${activeTab === 'Task Manager' ? 'active' : ''}`} onClick={() => setActiveTab('Task Manager')}>Task Manager</li>
        <li className={`sidebar-item ${activeTab === 'Employees' ? 'active' : ''}`} onClick={() => setActiveTab('Employees')}>Employees</li>
        <li className={`sidebar-item ${activeTab === 'Analytics' ? 'active' : ''}`} onClick={() => setActiveTab('Analytics')}>Analytics</li>
      </ul>
      <div className='sidebar-footer'>
        <button className='sidebar-logout' onClick={changeUser}>Log Out</button>
      </div>
    </div>
  );
};

export default AdminSidebar;
