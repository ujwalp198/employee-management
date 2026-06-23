import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/Authcontext';

const EmployeeDashboard = ({ changeUser, data }) => {
  const { updateTaskStatus } = useContext(AuthContext);
  const [filterCategory, setFilterCategory] = useState('All');

  const logOutUser = () => {
    localStorage.removeItem('loggedInUser');
    changeUser(null);
  };

  const handleStatusChange = (taskIndex, statusType) => {
    updateTaskStatus(data.id, taskIndex, statusType);
  };

  // Get unique categories
  const categories = ['All', ...new Set(data?.tasks?.map(t => t.category) || [])];

  // Filter tasks based on selected category
  const filteredTasks = data?.tasks?.filter(task => {
    if (filterCategory === 'All') return true;
    return task.category === filterCategory;
  });

  return (
    <div className='employee-layout-container employee-theme'>
      <header className='employee-topbar'>
        <div className='greeting-section'>
          <h1>Welcome back, <span className='highlight'>{data?.name || 'Employee'}</span> 👋</h1>
          <p>Your Employee ID: <strong style={{color: '#fff'}}>{data?.id}</strong></p>
        </div>
        <button className='employee-logout' onClick={logOutUser}>Log Out</button>
      </header>
      
      <div className='employee-main-content'>
        <div className='stats-grid'>
          <div className='stat-card new-task-card'>
            <div className='stat-icon'>🚀</div>
            <div className='stat-info'>
              <h2>{data?.tasks?.filter(t => t.newTask).length || 0}</h2>
              <h3>New Tasks</h3>
            </div>
          </div>
          <div className='stat-card active-task-card'>
            <div className='stat-icon'>⏳</div>
            <div className='stat-info'>
              <h2>{data?.tasks?.filter(t => t.active).length || 0}</h2>
              <h3>Active Tasks</h3>
            </div>
          </div>
          <div className='stat-card completed-task-card'>
            <div className='stat-icon'>✅</div>
            <div className='stat-info'>
              <h2>{data?.tasks?.filter(t => t.completed).length || 0}</h2>
              <h3>Completed</h3>
            </div>
          </div>
          <div className='stat-card failed-task-card'>
            <div className='stat-icon'>⚠️</div>
            <div className='stat-info'>
              <h2>{data?.tasks?.filter(t => t.failed).length || 0}</h2>
              <h3>Failed</h3>
            </div>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', marginBottom: '1.5rem'}}>
          <h2 className='section-title' style={{margin: 0}}>Your Task Board</h2>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <span style={{color: 'var(--text-muted)', fontWeight: '600'}}>Filter by Category:</span>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                background: 'rgba(0,0,0,0.3)',
                color: 'white',
                border: '1px solid var(--glass-border)',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat} style={{background: '#0f172a'}}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className='task-masonry'>
          {filteredTasks?.length > 0 ? filteredTasks.map((task, idx) => (
            <div key={idx} className={`emp-task-card ${task.active ? 'active' : task.completed ? 'completed' : task.failed ? 'failed' : 'new'}`}>
              <div className='task-header'>
                <span className='task-category'>{task.category}</span>
                <span className='task-date'>{task.date}</span>
              </div>
              <h2 className='task-title'>{task.title}</h2>
              <p className='task-description'>{task.description}</p>
              
              <div className='task-actions'>
                {task.active && !task.completed && !task.failed && (
                  <>
                    <button className='btn-complete' onClick={() => handleStatusChange(data.tasks.indexOf(task), 'complete')}>Mark Completed</button>
                    <button className='btn-failed' onClick={() => handleStatusChange(data.tasks.indexOf(task), 'fail')}>Mark Failed</button>
                  </>
                )}
                {task.newTask && !task.active && (
                   <button className='btn-accept' onClick={() => handleStatusChange(data.tasks.indexOf(task), 'accept')}>Accept Task</button>
                )}
                {(task.completed || task.failed) && (
                  <div className='status-msg'>
                    {task.completed ? 'Task is Complete' : 'Task Failed'}
                  </div>
                )}
              </div>
            </div>
          )) : (
            <p style={{color: 'var(--text-muted)'}}>No tasks found for this category.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard;
