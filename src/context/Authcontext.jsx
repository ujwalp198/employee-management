import React, { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage, saveEmployeesData, saveAdminData } from '../Utils/LocalStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    setLocalStorage(); // Initialize mock data if not present
    const { employees, admin } = getLocalStorage();
    setUserData(employees);
    setAdminData(admin);

    // Listen for changes across different tabs/windows to sync instantly
    const handleStorageChange = (e) => {
      if (e.key === 'employees' && e.newValue) {
        setUserData(JSON.parse(e.newValue));
      } else if (e.key === 'admin' && e.newValue) {
        setAdminData(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addEmployee = (name, email, password) => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newEmployee = {
      id: `EMP-${randomId}`,
      name,
      email,
      password,
      tasks: []
    };
    const updatedEmployees = [...userData, newEmployee];
    setUserData(updatedEmployees);
    saveEmployeesData(updatedEmployees);
  };

  const addAdmin = (name, email, password) => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newAdmin = {
      id: `ADM-${randomId}`,
      name,
      email,
      password
    };
    const updatedAdmins = [...adminData, newAdmin];
    setAdminData(updatedAdmins);
    saveAdminData(updatedAdmins);
  };

  const addTask = (employeeId, taskData) => {
    const updatedEmployees = userData.map(emp => {
      if (emp.id === employeeId) {
        return { ...emp, tasks: [...emp.tasks, taskData] };
      }
      return emp;
    });
    setUserData(updatedEmployees);
    saveEmployeesData(updatedEmployees);
  };

  const editTask = (employeeId, taskIndex, newTaskData) => {
    const updatedEmployees = userData.map(emp => {
      if (emp.id === employeeId) {
        const updatedTasks = [...emp.tasks];
        updatedTasks[taskIndex] = newTaskData;
        return { ...emp, tasks: updatedTasks };
      }
      return emp;
    });
    setUserData(updatedEmployees);
    saveEmployeesData(updatedEmployees);
  };

  const deleteTask = (employeeId, taskIndex) => {
    const updatedEmployees = userData.map(emp => {
      if (emp.id === employeeId) {
        const updatedTasks = emp.tasks.filter((_, idx) => idx !== taskIndex);
        return { ...emp, tasks: updatedTasks };
      }
      return emp;
    });
    setUserData(updatedEmployees);
    saveEmployeesData(updatedEmployees);
  };

  const updateTaskStatus = (employeeId, taskIndex, statusType) => {
    const updatedEmployees = userData.map(emp => {
      if (emp.id === employeeId) {
        const updatedTasks = [...emp.tasks];
        const task = updatedTasks[taskIndex];
        
        if (statusType === 'accept') {
          task.newTask = false;
          task.active = true;
        } else if (statusType === 'complete') {
          task.active = false;
          task.completed = true;
        } else if (statusType === 'fail') {
          task.active = false;
          task.failed = true;
        }
        
        return { ...emp, tasks: updatedTasks };
      }
      return emp;
    });
    setUserData(updatedEmployees);
    saveEmployeesData(updatedEmployees);
    
    // Update loggedInUser in localStorage to keep session fresh
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if (loggedInUserStr) {
      const loggedInUser = JSON.parse(loggedInUserStr);
      if (loggedInUser.role === 'employee' && loggedInUser.data.id === employeeId) {
        const updatedEmp = updatedEmployees.find(e => e.id === employeeId);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: updatedEmp }));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      userData, 
      adminData,
      setUserData, 
      addEmployee, 
      addAdmin,
      addTask, 
      editTask, 
      deleteTask,
      updateTaskStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
