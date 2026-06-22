import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import EmployeeLogin from './pages/EmployeeLogin';
import AdminSignup from './pages/AdminSignup';
import EmployeeSignup from './pages/EmployeeSignup';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import { AuthContext } from './context/Authcontext';
import NavigationBar from './components/NavigationBar';

const AppContent = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const { userData, adminData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
      try {
        const parsedData = JSON.parse(loggedInUser);
        setUser(parsedData.role);
        if (parsedData.role === 'employee') {
          setUserId(parsedData.data.id);
        } else if (parsedData.role === 'admin') {
          setUserId(parsedData.data.id);
        }
      } catch (error) {
        console.error("Error parsing loggedInUser from localStorage", error);
      }
    }
  }, []);

  const handleLogin = (email, password, portalType) => {
    if (portalType === 'admin') {
      if (adminData) {
        const admin = adminData.find((a) => email === a.email && a.password === password);
        if (admin) {
          setUser('admin');
          setUserId(admin.id);
          localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: admin }));
          navigate('/dashboard');
        } else {
          alert("Invalid Admin Credentials");
        }
      }
    } else if (portalType === 'employee') {
      if (userData) {
        const employee = userData.find((e) => email === e.email && e.password === password);
        if (employee) {
          setUser('employee');
          setUserId(employee.id);
          localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
          navigate('/dashboard');
        } else {
          alert("Invalid Employee Credentials");
        }
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserId(null);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const currentEmployeeData = user === 'employee' && userData 
    ? userData.find(emp => emp.id === userId) 
    : null;

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/admin-signup" element={
          <div className='homepage-container'>
            <NavigationBar />
            <AdminSignup />
          </div>
        } />
        
        <Route path="/employee-signup" element={
          <div className='homepage-container'>
            <NavigationBar />
            <EmployeeSignup />
          </div>
        } />

        <Route 
          path="/admin-login" 
          element={
            user ? <Navigate to="/dashboard" /> : 
            <div className='homepage-container'>
              <NavigationBar />
              <AdminLogin handleLogin={handleLogin} />
            </div>
          } 
        />
        <Route 
          path="/employee-login" 
          element={
            user ? <Navigate to="/dashboard" /> : 
            <div className='homepage-container'>
              <NavigationBar />
              <EmployeeLogin handleLogin={handleLogin} />
            </div>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            !user ? <Navigate to="/" /> : 
            user === 'admin' ? <AdminDashboard changeUser={handleLogout} /> : 
            <EmployeeDashboard changeUser={handleLogout} data={currentEmployeeData} />
          } 
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
