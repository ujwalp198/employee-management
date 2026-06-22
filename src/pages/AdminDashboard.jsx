import React, { useState, useContext } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { AuthContext } from '../context/Authcontext';

const AdminDashboard = ({ changeUser }) => {
  const { userData, addTask, editTask, deleteTask } = useContext(AuthContext);
  
  // State for adding tasks
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskAssigneeId, setTaskAssigneeId] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // State for editing tasks
  const [editingTask, setEditingTask] = useState(null);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!taskAssigneeId) {
      alert("Please enter an Assignee ID.");
      return;
    }
    
    const employeeExists = userData.find(emp => emp.id === taskAssigneeId);
    if (!employeeExists) {
        alert("Employee with this ID does not exist.");
        return;
    }

    const newTask = {
      title: taskTitle,
      date: taskDate,
      category: taskCategory,
      description: taskDescription,
      active: false,
      newTask: true,
      completed: false,
      failed: false
    };

    addTask(taskAssigneeId, newTask);
    alert('Task Created Successfully!');
    setTaskTitle('');
    setTaskDate('');
    setTaskAssigneeId('');
    setTaskCategory('');
    setTaskDescription('');
  };

  const handleEditClick = (employeeId, taskIndex, task) => {
    setEditingTask({ employeeId, taskIndex, ...task });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      title: editingTask.title,
      date: editingTask.date,
      category: editingTask.category,
      description: editingTask.description,
      active: editingTask.active,
      newTask: editingTask.newTask,
      completed: editingTask.completed,
      failed: editingTask.failed
    };
    editTask(editingTask.employeeId, editingTask.taskIndex, updatedTask);
    setEditingTask(null);
    alert("Task Updated Successfully!");
  };

  const handleDelete = (employeeId, taskIndex) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(employeeId, taskIndex);
    }
  };

  return (
    <div className='admin-layout-container admin-theme'>
      <AdminSidebar changeUser={changeUser} />
      
      <div className='admin-main-content'>
        <header className='admin-topbar'>
          <h1>Task Manager</h1>
          <div className='admin-profile'>
            <span>Admin</span>
            <div className='admin-avatar'>A</div>
          </div>
        </header>

        <div className='admin-content-grid'>
          <div className='create-task-container admin-card glass-panel'>
            <h2 className='section-title'>Create New Task</h2>
            <form className='create-task-form' onSubmit={submitHandler}>
              <div className='form-group'>
                <label>Task Title</label>
                <input value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)} type='text' required placeholder='Make UI design' className='form-input' />
              </div>
              
              <div className='form-group'>
                <label>Date</label>
                <input value={taskDate} onChange={(e)=>setTaskDate(e.target.value)} required type='date' className='form-input' />
              </div>
              
              <div className='form-group'>
                <label>Assign to (Employee ID)</label>
                <input value={taskAssigneeId} onChange={(e)=>setTaskAssigneeId(e.target.value)} required type='text' placeholder='EMP-XXXX' className='form-input' />
              </div>
              
              <div className='form-group'>
                <label>Category</label>
                <input value={taskCategory} onChange={(e)=>setTaskCategory(e.target.value)} required type='text' placeholder='Design, Dev, etc.' className='form-input' />
              </div>
              
              <div className='form-group description-group'>
                <label>Description</label>
                <textarea value={taskDescription} onChange={(e)=>setTaskDescription(e.target.value)} required cols='30' rows='5' className='form-textarea'></textarea>
              </div>
              
              <button type='submit' className='create-task-btn'>Create Task</button>
            </form>
          </div>

          {editingTask && (
             <div className='create-task-container admin-card glass-panel edit-mode'>
               <h2 className='section-title edit-title'>Edit Task</h2>
               <form className='create-task-form' onSubmit={handleEditSubmit}>
                  <div className='form-group'>
                    <label>Task Title</label>
                    <input value={editingTask.title} onChange={(e)=>setEditingTask({...editingTask, title: e.target.value})} type='text' required className='form-input' />
                  </div>
                  <div className='form-group'>
                    <label>Date</label>
                    <input value={editingTask.date} onChange={(e)=>setEditingTask({...editingTask, date: e.target.value})} required type='date' className='form-input' />
                  </div>
                  <div className='form-group description-group'>
                    <label>Description</label>
                    <textarea value={editingTask.description} onChange={(e)=>setEditingTask({...editingTask, description: e.target.value})} required cols='30' rows='5' className='form-textarea'></textarea>
                  </div>
                  <div className='edit-actions' style={{gridColumn: '1 / -1', display: 'flex', gap: '1rem'}}>
                    <button type="submit" className='create-task-btn edit-btn'>Save Changes</button>
                    <button type="button" onClick={() => setEditingTask(null)} className='create-task-btn cancel-btn'>Cancel</button>
                  </div>
               </form>
             </div>
          )}

          <div className='admin-task-list admin-card glass-panel'>
            <h2 className='section-title'>All Assigned Tasks</h2>
             <div className='admin-task-row header-row'>
               <h2>Employee</h2>
               <h2>Task Title</h2>
               <h2>Status</h2>
               <h2>Actions</h2>
             </div>
             
             {userData && userData.map((employee) => (
               employee.tasks.map((task, idx) => (
                 <div key={`${employee.id}-${idx}`} className='admin-task-row'>
                   <div className='employee-info'>
                     <h3>{employee.name}</h3>
                     <span className='employee-email'>{employee.id} • {employee.email}</span>
                   </div>
                   <h3>{task.title}</h3>
                   <div className='task-badges'>
                      {task.newTask && <span className='badge badge-new'>New</span>}
                      {task.active && <span className='badge badge-active'>Active</span>}
                      {task.completed && <span className='badge badge-completed'>Completed</span>}
                      {task.failed && <span className='badge badge-failed'>Failed</span>}
                   </div>
                   <div className='action-buttons'>
                     <button className='action-btn edit-action' onClick={() => handleEditClick(employee.id, idx, task)}>Edit</button>
                     <button className='action-btn delete-action' onClick={() => handleDelete(employee.id, idx)}>Delete</button>
                   </div>
                 </div>
               ))
             ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
