const defaultEmployees = [];

const defaultAdmin = [];

export const setLocalStorage = () => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(defaultEmployees));
  }
  if (!localStorage.getItem('admin')) {
    localStorage.setItem('admin', JSON.stringify(defaultAdmin));
  }
}

export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const admin = JSON.parse(localStorage.getItem('admin')) || [];
  return { employees, admin };
}

export const saveEmployeesData = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees));
}

export const saveAdminData = (admin) => {
  localStorage.setItem('admin', JSON.stringify(admin));
}
